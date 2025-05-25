// Create a new file AvailableCars.js in your React components directory

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comapnies = () => {
  const [carNames, setCarNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailableCars = async () => {
      try {
        const response = await axios.get('/api/cars/available'); // Adjust the URL as per your setup
        setCarNames(response.data.map(car => car.carName));
      } catch (err) {
        setError('Failed to fetch car names.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableCars();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Available Cars</h1>
      <ul>
        {carNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comapnies;
