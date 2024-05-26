import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PropertyDetails = () => {
    const [property, setProperty] = useState(null);
    const [seller, setSeller] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/properties/${id}`);
                setProperty(response.data);
                setSeller({
                    firstName: response.data.seller.firstName,
                    lastName: response.data.seller.lastName,
                    email: response.data.seller.email,
                    phoneNumber: response.data.seller.phoneNumber,
                });
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            {isLoading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="container mx-auto p-4">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                        <img
                            src={property.image || 'https://i.pinimg.com/originals/6a/4f/01/6a4f018a56c9f39379e6ffea7b2e0309.jpg'} 
                            alt={property.title}
                            className="w-full h-96 object-cover"
                        />
                        <div className="p-8">
                            <h1 className="text-4xl font-bold mb-4 text-gray-800">{property.title}</h1>
                            <p className="text-lg text-gray-700 mb-4">{property.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <p className="text-gray-600"><strong>Location:</strong> {property.location}</p>
                                <p className="text-gray-600"><strong>Area:</strong> {property.area} sq.ft.</p>
                                <p className="text-gray-600"><strong>Bedrooms:</strong> {property.bedrooms}</p>
                                <p className="text-gray-600"><strong>Bathrooms:</strong> {property.bathrooms}</p>
                                <p className="text-gray-600"><strong>Nearby Hospitals:</strong> {property.nearbyHospitals.join(', ')}</p>
                                <p className="text-gray-600"><strong>Nearby Colleges:</strong> {property.nearbyColleges.join(', ')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Seller Information</h2>
                        <div className="text-gray-700">
                            <p><strong>Name:</strong> {seller.firstName} {seller.lastName}</p>
                            <p><strong>Email:</strong> {seller.email}</p>
                            <p><strong>Phone:</strong> {seller.phoneNumber}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyDetails;
