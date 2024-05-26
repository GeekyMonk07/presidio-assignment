import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/users/login', formData);
            const { token, role } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('firstName', response.data.firstName);

            if (role === 'buyer') {
                // Redirect to home page for buyers
                window.location.href = '/home';
            } else if (role === 'seller') {
                // Redirect to seller dashboard for sellers
                window.location.href = '/seller';
            }
        } catch (error) {
            console.error(error);
            alert('Invalid credentials');
            // Handle error
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <a
                href="/register"
                className="text-white hover:text-gray-300 font-bold mt-4"
            >
                Don't have an account? Register
            </a>
        </div>
    );
};

export default Login;
