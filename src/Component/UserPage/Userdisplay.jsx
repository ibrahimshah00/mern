

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
const UserDisplay = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cars`);
        setCars(response.data);
        setFilteredCars(response.data);
      } catch (err) {
        setError('Error fetching cars');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    let results = cars;

    if (searchTerm) {
      results = results.filter(car =>
        car.carName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCompany) {
      results = results.filter(car => car.company === selectedCompany);
    }

    setFilteredCars(results);
  }, [searchTerm, selectedCompany, cars]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleCardClick = (carId) => {
    navigate(`/car/${carId}`);
  };

  const handlelogin=()=>{
    navigate('/admin')
  }
  const handlesignup=()=>{
    navigate('/signup')
  }

  return (
    <>
      <Navbar onCompanySelect={setSelectedCompany} />
      <div className="userdisplaycontainer">
        
        <div className="car-grid">
          {
          filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div key={car._id} className="car-card" onClick={() => handleCardClick(car._id)}>
                <img
                  src={car.pictures[0] || '/default-car-image.jpg'}
                  alt={car.carName}
                  className="car-image"
                />
                <div className="cardcarprice">
                  $  {car.price} 
                </div>
                <h2>{car.carName}</h2>
                <div className="carfeatures">
                  <p><strong>Model:</strong> {car.model}</p>
                  <p><strong>|</strong></p>
                  <p><strong>{car.company}</strong></p>
                  <p><strong>Guarantee: </strong> {car.guarantee}</p>
                  <p><strong>|</strong></p>
                  <p><strong>Available: </strong> {car.isAvailable ? 'Yes' : 'No'}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No cars found.</p>
          )}
       
        </div>
        <div className="search-containers">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by car name"
            className="search-input"
          />
        </div>
        <div className='login-buttons'>
          <button onClick={handlelogin}>Login</button>
          <button onClick={handlesignup}>Signup</button>
        </div> 
      </div>
    </>
  );
};

export default UserDisplay;
