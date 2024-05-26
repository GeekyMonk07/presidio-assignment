import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, onLike, onInterest }) => {
    const randomImageUrl = 'https://i.pinimg.com/originals/6a/4f/01/6a4f018a56c9f39379e6ffea7b2e0309.jpg'; // Random image placeholder

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <img
                src={property.image || randomImageUrl}
                alt={property.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">{property.title}</h2>
                <p className="text-gray-600 mb-4">{property.description}</p>
                <p className="text-gray-500">Location: {property.location}</p>
                <p className="text-gray-500">Area: {property.area} sq.ft.</p>
                <p className="text-gray-500">Bedrooms: {property.bedrooms}</p>
                <p className="text-gray-500">Bathrooms: {property.bathrooms}</p>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={onLike}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                        Like
                    </button>
                    <button
                        onClick={onInterest}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                        I'm Interested
                    </button>
                    <Link
                        to={`/property/${property._id}`}
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
