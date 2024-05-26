import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const firstName = localStorage.getItem('firstName');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        localStorage.removeItem('role');
        navigate('/');
    };

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="text-white font-bold">
                            RENTIFY
                        </div>
                    </div>
                    <div className="flex items-center">
                        {firstName ? (
                            <span className="text-white mr-4">
                                Hi there, {firstName}
                            </span>
                        ) : (
                            <>
                                <Link
                                    to="/"
                                    className="text-white mr-4 hover:text-gray-300"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-white mr-4 hover:text-gray-300"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                        {firstName && (
                            <button
                                onClick={handleLogout}
                                className="text-white hover:text-gray-300"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
