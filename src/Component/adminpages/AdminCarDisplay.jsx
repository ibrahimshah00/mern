
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'boxicons';
import { useNavigate, useParams } from 'react-router-dom';


export default function AdminCarDisplay() {
    const { company } = useParams();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleNavigateToAddCar = () => {
        navigate('/add-car');
    };

    const fetchCars = async (searchTerm = '') => {
        try {
            let url = `${import.meta.env.VITE_API_URL}/cars`;
            if (company) {
                url = `${import.meta.env.VITE_API_URL}/cars/filter/company/${company}`;
            }
            if (searchTerm) {
                url = `${import.meta.env.VITE_API_URL}/cars/search/cars?carName=${searchTerm}`;
            }
            const response = await axios.get(url);
            console.log('Fetched cars:', response.data);
            setCars(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cars:', error);
            setError('Failed to fetch cars.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars(searchTerm);
    }, [company, searchTerm]);

    const handleNavigateToUpdate = (carId) => {
        navigate(`/update-car/${carId}`);
    };

    const handleDeleteCar = async (carId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this car?");
        if (!isConfirmed) {
            return;
        }
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No token found in localStorage');
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/cars/${carId}`, config);
            console.log('Car deleted:', response.data);
            setCars(cars.filter(car => car._id !== carId));
        } catch (error) {
            console.error('Error deleting car:', error.response ? error.response.data : error.message);
            alert('Failed to delete car: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <>
       <div className="admincardisplaycontainer">
        
        <div className='admincars'>
            <div className="pagebar">
                <button onClick={handleNavigateToAddCar} className="add-car-button">
                    Add Car
                </button>
                <div className="adminsearch-container">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by car name"
                        className="search-input"
                    />
                </div>
            </div>
            <div className="car-table-container">
                <table className="car-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th style={{backgroundColor:"#e7e7e7"}}>Car Name</th>
                            <th>Model</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.length > 0 ? (
                            cars.map((car) => (
                                <tr key={car._id}>
                                    <td>
                                        <img
                                            src={car.pictures.length > 0 ? car.pictures[0] : '/default-car-image.jpg'}
                                            alt="Car Image"
                                            className="car-thumbnail"
                                            onError={(e) => e.target.src = "/default-car-image.jpg"}
                                        />
                                    </td>
                                    <td>{car.carName || 'N/A'}</td>
                                    <td>{car.model || 'N/A'}</td>
                                    <td>
                                        <button className="action-button" onClick={() => handleNavigateToUpdate(car._id)}>
                                            <box-icon name='edit-alt'></box-icon>
                                        </button>
                                        <button className="action-button delete-button" onClick={() => handleDeleteCar(car._id)}>
                                            <box-icon type='solid' name='trash-alt'></box-icon>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No cars available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
       </div>
       
        
        </>
    );
}
