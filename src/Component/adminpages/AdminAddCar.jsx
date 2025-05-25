import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminAddCar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carName: '',
    price:'',
    milesRun: '',
    model: '',
    transmission: '',
    fuelType: '',
    company: '',
    carId: '',
    isAvailable: true,
    guarantee: '',
    description: '',
    numberOfPassengers: '',
    color: '',
    equipments: {
      ac: false,
      heater: false,
      tracker: false,
      gps: false,
      radar: false,
      abs: false,
      climatiseur: false,
      powerDoorLocks: false,
      antiLockBrakingSystem: false,
      brakeAssist: false,
      powerSteering: false,
      driverAirbag: false,
      passengerAirbag: false,
      powerWindows: false,
      cdPlayer: false,
      centralLocking: false,
      crashSensor: false,
      leatherSeats: false,
      bluetooth: false,
      rearviewCamera: false,
      automatic: false,
    },
  });

  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEquipmentsChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      equipments: {
        ...prevData.equipments,
        [name]: checked,
      },
    }));
  };

  const handleFileChange = (e) => {
    setPictures(e.target.files); // Handle file input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'equipments') {
        // Directly append the equipments object
        data.append(key, JSON.stringify(formData.equipments));
      } else {
        data.append(key, formData[key]);
      }
    });
    
    for (let i = 0; i < pictures.length; i++) {
      data.append('pictures', pictures[i]);
    }
  
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:5000/api/cars', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      setSuccess('Car added successfully!');
      setError('');
      setFormData({
        carName: '',
        price:'',
        milesRun: '',
        model: '',
        transmission: '',
        fuelType: '',
        company: '',
        carId: '',
        isAvailable: true,
        guarantee: '',
        description: '',
        numberOfPassengers: '',
        color: '',
        equipments: {
          ac: false,
          heater: false,
          tracker: false,
          gps: false,
          radar: false,
          abs: false,
          climatiseur: false,
          powerDoorLocks: false,
          antiLockBrakingSystem: false,
          brakeAssist: false,
          powerSteering: false,
          driverAirbag: false,
          passengerAirbag: false,
          powerWindows: false,
          cdPlayer: false,
          centralLocking: false,
          crashSensor: false,
          leatherSeats: false,
          bluetooth: false,
          rearviewCamera: false,
          automatic: false,
        },
      });
      setPictures([]);
      
      navigate('/AdminCarDisply');
    } catch (err) {
      setError('Error adding car. Please try again.');
      setSuccess('');
    }
  };
  

  // return (
  //   // <div>
  //   //   <h1>Add a New Car</h1>
  //   //   {success && <p style={{ color: 'green' }}>{success}</p>}
  //   //   {error && <p style={{ color: 'red' }}>{error}</p>}
  //   //   <div className="update-form">
  //   //   <form onSubmit={handleSubmit}>
  //   //     <div>
  //   //       <label>Car Name:</label>
  //   //       <input
  //   //         type="text"
  //   //         name="carName"
  //   //         value={formData.carName}
  //   //         onChange={handleChange}
  //   //         required
  //   //       />
  //   //     </div>
  //   //     <div>
  //   //       <label>Price:</label>
  //   //       <input
  //   //         type="text"
  //   //         name="price"
  //   //         value={formData.price}
  //   //         onChange={handleChange}
  //   //         required
  //   //       />
  //   //     </div>
  //   //     <div>
  //   //       <label>Miles Run:</label>
  //   //       <input
  //   //         type="text"
  //   //         name="milesRun"
  //   //         value={formData.milesRun}
  //   //         onChange={handleChange}
  //   //         required
  //   //       />
  //   //     </div>
  //   //     <div>
  //   //       <label>Model:</label>
  //   //       <input
  //   //         type="text"
  //   //         name="model"
  //   //         value={formData.model}
  //   //         onChange={handleChange}
  //   //         required
  //   //       />
  //   //     </div>
  //   //     <div>
  //   //       <label>Transmission:</label>
  //   //       <input
  //   //         type="text"
  //   //         name="transmission"
  //   //         value={formData.transmission}
  //   //         onChange={handleChange}
  //   //         required
  //   //       />
  //   //     </div>
  //   //     <div>
  //   //       <label>Fuel Type:</label>
  //   //       <input
  //   //         type="text"
  //   //         name="fuelType"
  //   //         value={formData.fuelType}
  //   //         onChange={handleChange}
  //   //         required
  //   //       />
  //   //     </div>
  //   //     <div>
  //   //       <label>Company:</label>
  //   //       <input
  //   //         type="text"
  //   //         name="company"
  //   //         value={formData.company}
  //   //         onChange={handleChange}
  //   //         required
  //   //       />
  //   //     </div>
  //   //     <div>
  //   //       <label>Car ID:</label>
  //   //       <input
  //   //         type="text"
  //   //         name="carId"
  //   //         value={formData.carId}
  //   //         onChange={handleChange}
  //   //         required
  //   //       />
  //   //     </div>
  //   //     <div>
  //   //       <label>Available:</label>
  //   //       <input
  //   //         type="checkbox"
  //   //         name="isAvailable"
  //   //         checked={formData.isAvailable}
  //   //         onChange={handleChange}
  //   //       />
  //   //     </div>
  //   //     <div>
  //   //       <label>Guarantee:</label>
  //   //       <input
  //   //         type="text"
  //   //         name="guarantee"
  //   //         value={formData.guarantee}
  //   //         onChange={handleChange}
  //   //       />
  //   //     </div>
  //   //     <div>
  //   //       <label>Description:</label>
  //   //       <textarea
  //   //         name="description"
  //   //         value={formData.description}
  //   //         onChange={handleChange}
  //   //       />
  //   //     </div>
  //   //     <div>
  //   //       <label>Number of Passengers:</label>
  //   //       <input
  //   //         type="number"
  //   //         name="numberOfPassengers"
  //   //         value={formData.numberOfPassengers}
  //   //         onChange={handleChange}
  //   //       />
  //   //     </div>
  //   //     <div>
  //   //       <label>Color:</label>
  //   //       <input
  //   //         type="text"
  //   //         name="color"
  //   //         value={formData.color}
  //   //         onChange={handleChange}
  //   //       />
  //   //     </div>
  //   //     <div>
  //   //       <label>Equipments:</label>
  //   //       <div className='equip'>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="ac"
  //   //             checked={formData.equipments.ac}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           AC
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="heater"
  //   //             checked={formData.equipments.heater}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           Heater
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="tracker"
  //   //             checked={formData.equipments.tracker}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           Tracker
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="gps"
  //   //             checked={formData.equipments.gps}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           GPS
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="radar"
  //   //             checked={formData.equipments.radar}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           Radar
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="abs"
  //   //             checked={formData.equipments.abs}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           ABS
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="climatiseur"
  //   //             checked={formData.equipments.climatiseur}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           Air Conditioning (Climatiseur)
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="powerDoorLocks"
  //   //             checked={formData.equipments.powerDoorLocks}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           Power Door Locks
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="antiLockBrakingSystem"
  //   //             checked={formData.equipments.antiLockBrakingSystem}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           Anti-lock Braking System
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="brakeAssist"
  //   //             checked={formData.equipments.brakeAssist}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           Brake Assist
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="powerSteering"
  //   //             checked={formData.equipments.powerSteering}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           Power Steering
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="driverAirbag"
  //   //             checked={formData.equipments.driverAirbag}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           Driver Airbag
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="passengerAirbag"
  //   //             checked={formData.equipments.passengerAirbag}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           Passenger Airbag
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="powerWindows"
  //   //             checked={formData.equipments.powerWindows}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           Power Windows
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="cdPlayer"
  //   //             checked={formData.equipments.cdPlayer}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           CD Player
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="centralLocking"
  //   //             checked={formData.equipments.centralLocking}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           Central Locking
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="crashSensor"
  //   //             checked={formData.equipments.crashSensor}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           Crash Sensor
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="leatherSeats"
  //   //             checked={formData.equipments.leatherSeats}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           Leather Seats
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="bluetooth"
  //   //             checked={formData.equipments.bluetooth}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           Bluetooth
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="rearviewCamera"
  //   //             checked={formData.equipments.rearviewCamera}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           Rearview Camera
  //   //         </label>
  //   //         <label>
  //   //           <input
  //   //             type="checkbox"
  //   //             name="automatic"
  //   //             checked={formData.equipments.automatic}
  //   //             onChange={handleEquipmentsChange}
  //   //           />
  //   //           Automatic
  //   //         </label>
  //   //       </div>
  //   //     </div>
  //   //     <div>
  //   //       <label>Pictures:</label>
  //   //       <input
  //   //         type="file"
  //   //         multiple
  //   //         onChange={handleFileChange}
  //   //         required
  //   //       />
  //   //     </div>
  //   //     <button type="submit">Add Car</button>
  //   //   </form>
  //   // </div>
  //   // </div>

  //   <div>
  //     <h1>Add a New Car</h1>
  //     {success && <p style={{ color: 'green' }}>{success}</p>}
  //     {error && <p style={{ color: 'red' }}>{error}</p>}
  //     <div className="update-form">
  //       <form onSubmit={handleSubmit}>
  //         <div>
  //           <label>Car Name:</label>
  //           <input
  //             type="text"
  //             name="carName"
  //             value={formData.carName}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <label>Price:</label>
  //           <input
  //             type="text"
  //             name="price"
  //             value={formData.price}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <label>Miles Run:</label>
  //           <input
  //             type="text"
  //             name="milesRun"
  //             value={formData.milesRun}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <label>Model:</label>
  //           <input
  //             type="text"
  //             name="model"
  //             value={formData.model}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <label>Transmission:</label>
  //           <input
  //             type="text"
  //             name="transmission"
  //             value={formData.transmission}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <label>Fuel Type:</label>
  //           <input
  //             type="text"
  //             name="fuelType"
  //             value={formData.fuelType}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <label>Company:</label>
  //           <input
  //             type="text"
  //             name="company"
  //             value={formData.company}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <label>Car ID:</label>
  //           <input
  //             type="text"
  //             name="carId"
  //             value={formData.carId}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <label>Available:</label>
  //           <input
  //             type="checkbox"
  //             name="isAvailable"
  //             checked={formData.isAvailable}
  //             onChange={handleChange}
  //           />
  //         </div>
  //         <div>
  //           <label>Guarantee:</label>
  //           <input
  //             type="text"
  //             name="guarantee"
  //             value={formData.guarantee}
  //             onChange={handleChange}
  //           />
  //         </div>
  //         <div>
  //           <label>Description:</label>
  //           <textarea
  //             name="description"
  //             value={formData.description}
  //             onChange={handleChange}
  //           />
  //         </div>
  //         <div>
  //           <label>Number of Passengers:</label>
  //           <input
  //             type="number"
  //             name="numberOfPassengers"
  //             value={formData.numberOfPassengers}
  //             onChange={handleChange}
  //           />
  //         </div>
  //         <div>
  //           <label>Color:</label>
  //           <input
  //             type="text"
  //             name="color"
  //             value={formData.color}
  //             onChange={handleChange}
  //           />
  //         </div>
  //         <div>
  //           <label>Equipments:</label>
  //           <div className='equip'>
  //             {Object.keys(formData.equipments).map((equipment) => (
  //               <label key={equipment}>
  //                 <input
  //                   type="checkbox"
  //                   name={equipment}
  //                   checked={formData.equipments[equipment]}
  //                   onChange={handleEquipmentsChange}
  //                 />
  //                 {equipment.replace(/([A-Z])/g, ' $1').trim()} {/* Converts camelCase to readable format */}
  //               </label>
  //             ))}
  //           </div>
  //         </div>
  //         <div>
  //           <label>Pictures:</label>
  //           <input
  //             type="file"
  //             multiple
  //             onChange={handleFileChange}
  //             required
  //           />
  //         </div>
  //         <button type="submit">Add Car</button>
  //       </form>
  //     </div>
  //   </div>
  
  // );
  // return (
  //   <div className="admin-add-car-container">
  //     <h1 className="admin-add-car-heading">Add a New Car</h1>
  //     {success && <p className="success-message">{success}</p>}
  //     {error && <p className="error-message">{error}</p>}
  //     <form className="admin-add-car-form" onSubmit={handleSubmit}>
  //       <div className="form-row">
  //         <div className="form-group long-input">
  //           <label className="form-label">Car Name:</label>
  //           <input
  //             type="text"
  //             name="carName"
  //             value={formData.carName}
  //             onChange={handleChange}
  //             className="form-input"
  //             required
  //           />
  //         </div>
  //         <div className="form-group expandable-description">
  //           <label className="form-label">Description:</label>
  //           <textarea
  //             name="description"
  //             value={formData.description}
  //             onChange={handleChange}
  //             className="form-textarea"
  //           />
  //         </div>
  //       </div>
  //       <div className="price-form-row">
  //         <div className="form-group half-width">
  //           <label className="form-label">Price:</label>
  //           <input
  //             type="text"
  //             name="price"
  //             value={formData.price}
  //             onChange={handleChange}
  //             className="form-input"
  //             required
  //           />
  //         </div>
  //         <div className="form-group half-width">
  //           <label className="form-label">Company:</label>
  //           <input
  //             type="text"
  //             name="company"
  //             value={formData.company}
  //             onChange={handleChange}
  //             className="form-input"
  //             required
  //           />
  //         </div>
  //       </div>
  //       <div className="form-row">
  //         <div className="form-group third-width">
  //           <label className="form-label">Color:</label>
  //           <input
  //             type="text"
  //             name="color"
  //             value={formData.color}
  //             onChange={handleChange}
  //             className="form-input"
  //           />
  //         </div>
  //         <div className="form-group third-width">
  //           <label className="form-label">Model:</label>
  //           <input
  //             type="text"
  //             name="model"
  //             value={formData.model}
  //             onChange={handleChange}
  //             className="form-input"
  //           />
  //         </div>
  //         <div className="form-group third-width">
  //           <label className="form-label">Miles Run:</label>
  //           <input
  //             type="text"
  //             name="milesRun"
  //             value={formData.milesRun}
  //             onChange={handleChange}
  //             className="form-input"
  //           />
  //         </div>
  //       </div>
  //       <div className="form-row">
  //         <div className="form-group">
  //           <label className="form-label">Transmission:</label>
  //           <input
  //             type="text"
  //             name="transmission"
  //             value={formData.transmission}
  //             onChange={handleChange}
  //             className="form-input"
  //             required
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label className="form-label">Fuel Type:</label>
  //           <input
  //             type="text"
  //             name="fuelType"
  //             value={formData.fuelType}
  //             onChange={handleChange}
  //             className="form-input"
  //             required
  //           />
  //         </div>
  //       </div>
  //       <div className="form-group">
  //         <label className="form-label">Car ID:</label>
  //         <input
  //           type="text"
  //           name="carId"
  //           value={formData.carId}
  //           onChange={handleChange}
  //           className="form-input"
  //           required
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label className="form-label">Available:</label>
  //         <input
  //           type="checkbox"
  //           name="isAvailable"
  //           checked={formData.isAvailable}
  //           onChange={handleChange}
  //           className="form-checkbox"
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label className="form-label">Guarantee:</label>
  //         <input
  //           type="text"
  //           name="guarantee"
  //           value={formData.guarantee}
  //           onChange={handleChange}
  //           className="form-input"
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label className="form-label">Number of Passengers:</label>
  //         <input
  //           type="number"
  //           name="numberOfPassengers"
  //           value={formData.numberOfPassengers}
  //           onChange={handleChange}
  //           className="form-input"
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label className="form-label">Equipments:</label>
  //         <div className="equipments-container">
  //           {Object.keys(formData.equipments).map((key) => (
  //             <label key={key} className="equipment-label">
  //               <input
  //                 type="checkbox"
  //                 name={key}
  //                 checked={formData.equipments[key]}
  //                 onChange={handleEquipmentsChange}
  //                 className="equipment-checkbox"
  //               />
  //               {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
  //             </label>
  //           ))}
  //         </div>
  //       </div>
  //       <div className="form-group">
  //         <label className="form-label">Pictures:</label>
  //         <input
  //           type="file"
  //           multiple
  //           onChange={handleFileChange}
  //           className="form-file-input"
  //           required
  //         />
  //       </div>
  //       <button type="submit" className="submit-button">Add Car</button>
  //     </form>
  //   </div>
  // );
  return (
    <div className="admin-add-car-container">
      <h1 className="admin-add-car-heading">Add a New Car</h1>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
      <form className="admin-add-car-form" onSubmit={handleSubmit}>
        <div className="name-form-row">
          <div className="form-group long-input">
            <label className="form-label">Car Name:</label>
            <input
              type="text"
              name="carName"
              value={formData.carName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group expandable-description">
            <label className="form-label">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
            />
          </div>
        </div>
        <div className="price-form-row">
          <div className="form-group half-width">
            <label className="form-label">Price:</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group half-width">
            <label className="form-label">Company:</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        <div className="form-row-three">
          <div className="form-group third-width">
            <label className="form-label">Color:</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group third-width">
            <label className="form-label">Model:</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group third-width">
            <label className="form-label">Miles Run:</label>
            <input
              type="text"
              name="milesRun"
              value={formData.milesRun}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Transmission:</label>
            <input
              type="text"
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Fuel Type:</label>
            <input
              type="text"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Car ID:</label>
          <input
            type="text"
            name="carId"
            value={formData.carId}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Available:</label>
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
            className="form-checkbox"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Guarantee:</label>
          <input
            type="text"
            name="guarantee"
            value={formData.guarantee}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Number of Passengers:</label>
          <input
            type="number"
            name="numberOfPassengers"
            value={formData.numberOfPassengers}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Equipments:</label>
          <div className="equipments-container">
            {Object.keys(formData.equipments).map((key) => (
              <label key={key} className="equipment-label">
                <input
                  type="checkbox"
                  name={key}
                  checked={formData.equipments[key]}
                  onChange={handleEquipmentsChange}
                  className="equipment-checkbox"
                />
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Pictures:</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="form-file-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Car</button>
      </form>
    </div>
  );
  
};

export default AdminAddCar;
