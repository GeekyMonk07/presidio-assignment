import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    // Handle unauthorized access
                    return;
                }

                const response = await axios.get('http://localhost:4000/api/properties/seller', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProperties(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const handleDelete = async (propertyId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                // Handle unauthorized access
                alert('Unauthorized access');
                return;
            }

            await axios.delete(`http://localhost:4000/api/properties/${propertyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Property deleted');
            setProperties(properties.filter((property) => property._id !== propertyId));
        } catch (error) {
            console.error(error);
            alert('Error deleting property');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Seller Dashboard</h1>
                {isLoading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : (
                    <div>
                        <div className="flex justify-end mb-8">
                            <Link
                                to="/seller/add-property"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Add Property
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {properties.map((property) => (
                                <div
                                    key={property._id}
                                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                                >
                                    <img
                                        src="https://i.pinimg.com/originals/6a/4f/01/6a4f018a56c9f39379e6ffea7b2e0309.jpg"
                                        alt={property.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold mb-2 text-gray-800">{property.title}</h2>
                                        <p className="text-gray-700 mb-4">{property.description}</p>
                                        <p className="text-gray-600 mb-2">Location: {property.location}</p>
                                        <div className="flex justify-between mt-4">
                                            <Link
                                                to={`/seller/edit-property/${property._id}`}
                                                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(property._id)}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellerDashboard;
