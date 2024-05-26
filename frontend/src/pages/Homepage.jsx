import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/properties');
        setProperties(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleLike = async (propertyId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Handle unauthorized access
        return;
      }

      await axios.put(`http://localhost:4000/api/properties/like/${propertyId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Handle successful like
      alert('Property liked');
    } catch (error) {
      console.error(error);
      // Handle error
      alert('Error liking property');
    }
  };

  const handleInterest = async (propertyId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Handle unauthorized access
        return;
      }

      await axios.put(`http://localhost:4000/api/properties/interest/${propertyId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Handle successful expression of interest
      alert('Interest expressed');
    } catch (error) {
      console.error(error);
      // Handle error
      alert('Error expressing interest');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">Discover Your Dream Property</h1>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              onLike={() => handleLike(property._id)}
              onInterest={() => handleInterest(property._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
