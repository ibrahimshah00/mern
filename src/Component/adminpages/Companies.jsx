

import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function Companies() {
    const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarsByCompany = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cars/filter/companies');
        setCars(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    

    fetchCarsByCompany();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
         <div>
      <h1>Honda Cars</h1>
      {Array.isArray(cars) && cars.length === 0 ? (
        <p>No Honda cars found</p>
      ) : (
        <ul>
          {Array.isArray(cars) && cars.map(car => (
            <li key={car._id}>
              <h2>{car.carName}</h2>
              <p>Model: {car.model}</p>
              <p>Miles Run: {car.milesRun}</p>
              <p>Transmission: {car.transmission}</p>
              <p>Fuel Type: {car.fuelType}</p>
              <p>Company: {car.company}</p>
              <p>Description: {car.description}</p>
              <div>
                {car.pictures.map((picture, index) => (
                  <img key={index} src={picture} alt={`${car.carName} ${index + 1}`} style={{ width: '200px' }} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  )
}
