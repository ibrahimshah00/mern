import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateCar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    carName: '',
    description: '',
    model: '',
    milesRun: '',
    fuelType: '',
    transmission: '',
    guarantee: '',
    company: '',
    color: '',
    numberOfPassengers: '',
    price: '',
    equipments: {
      ac: false,
      heater: false,
      tracker: false,
      gps: false,
      radar: false,
      bluetooth:false,
      climatiseur: false,
      powerDoorLocks: false,
      abs:false
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cars/${id}`);
        const fetchedEquipments = response.data.equipments || {
          ac: false,
          heater: false,
          tracker: false,
          gps: false,
          radar: false,
          bluetooth: false,
          climatiseur: false,
      powerDoorLocks: false,
      abs:false
        };
        setFormData({
          carName: response.data.carName,
          description: response.data.description,
          model: response.data.model,
          milesRun: response.data.milesRun,
          fuelType: response.data.fuelType,
          transmission: response.data.transmission,
          guarantee: response.data.guarantee,
          company: response.data.company,
          color: response.data.color,
          numberOfPassengers: response.data.numberOfPassengers,
          price: response.data.price,
          equipments: {
            ac: fetchedEquipments.ac === "true",
            heater: fetchedEquipments.heater === "true",
            tracker: fetchedEquipments.tracker === "true",
            gps: fetchedEquipments.gps === "true",
            radar: fetchedEquipments.radar === "true",
            bluetooth: fetchedEquipments.bluetooth === "true",
            abs:fetchedEquipments.abs==="true",
            climatiseur: fetchedEquipments.climatiseur === "true",
            powerDoorLocks:fetchedEquipments.powerDoorLocks==="true",
          },
        });
        setCurrentImages(response.data.pictures || []); // Load existing images
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch car.');
        setLoading(false);
      }
    };

    fetchCar();

    // Clean up function to revoke object URLs
    return () => {
      selectedImages.forEach(image => URL.revokeObjectURL(image));
    };
  }, [id, selectedImages]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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


  const handleImageChange = (e) => {
    setSelectedImages([...e.target.files]); // Handle multiple image file selection
  };

  const handleRemoveCurrentImage = (index) => {
    const removedImage = currentImages[index];
    setRemovedImages([...removedImages, removedImage]);
    setCurrentImages(currentImages.filter((_, i) => i !== index)); // Remove existing image
  };


  const handleRemoveSelectedImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index)); // Remove new image
  };

 
  
  // const handleUpdate = async () => {
  //   const authToken = localStorage.getItem('authToken'); // Retrieve the token
  
  //   if (!authToken) {
  //     alert('No authentication token found. Please log in.');
  //     return;
  //   }
  
  //   try {
  //     // Construct the data payload as FormData
  //     const payload = new FormData();
  //     for (const key in formData) {
  //       if (typeof formData[key] === 'object' && !Array.isArray(formData[key])) {
  //         for (const subKey in formData[key]) {
  //           payload.append(`equipments[${subKey}]`, formData[key][subKey]);
  //         }
  //       } else {
  //         payload.append(key, formData[key]);
  //       }
  //     }
  
  //     // currentImages.forEach((image, index) => {
  //     //   payload.append(`currentImages`, image); // Adjusting the key name for current images
  //     // });
  //     currentImages.forEach((image) => {
  //       if (!removedImages.includes(image)) {
  //         payload.append('currentImages', image); // Adjusting the key name for current images
  //       }
  //     });
  
  //     // selectedImages.forEach((image, index) => {
  //     //   payload.append('images', image); // Adjusting the key name for new selected images
  //     // });
  //     selectedImages.forEach((image) => {
  //       payload.append('images', image); // Adjusting the key name for new selected images
  //     });
      
  //     // removedImages.forEach((image) => {
  //     //   payload.append('removedImages', image); // Include removed images in the payload
  //     // });
  //     removedImages.forEach((image) => {
  //       payload.append('removedImages', image); // Include removed images in the payload
  //     });

  //     await axios.put(
  //       `${import.meta.env.VITE_API_URL}/cars/${id}`,
  //       payload,
  //       {
  //         headers: {
  //           'Authorization': `Bearer ${authToken}`, // Include the token in the request
  //           'Content-Type': 'multipart/form-data'// Do not set Content-Type to application/json for FormData
  //         }
  //       }
  //     );
  
  //     // Clear file input
  //     setSelectedImages([]);
  //     setRemovedImages([]);
  //     document.querySelector('input[type="file"]').value = '';
  
  //     navigate('/AdminCarDisply'); // Navigate to the AdminCarDisplay page
  //   } catch (error) {
  //     console.error('Error updating car:', error.response || error.message);
  //     alert('Failed to update car.');
  //   }
  // };
  
  const handleUpdate = async () => {
    const authToken = localStorage.getItem('authToken'); // Retrieve the token
  
    if (!authToken) {
      alert('No authentication token found. Please log in.');
      return;
    }
  
    try {
      // Create a new FormData object
      const payload = new FormData();
  
      // Append form data
      for (const key in formData) {
        if (typeof formData[key] === 'object' && !Array.isArray(formData[key])) {
          for (const subKey in formData[key]) {
            payload.append(`equipments[${subKey}]`, formData[key][subKey]);
          }
        } else {
          payload.append(key, formData[key]);
        }
      }
  
      // Append images: currentImages minus removedImages
      currentImages
        .filter(image => !removedImages.includes(image.identifier || image)) // Adjust based on how you identify images
        .forEach((image) => {
          payload.append('currentImages', image); // Ensure this key is what your backend expects
        });
  
      // Append newly selected images
      selectedImages.forEach((image) => {
        payload.append('images', image); // Ensure this key is what your backend expects
      });
  
      // Append removed images
      removedImages.forEach((image) => {
        payload.append('removedImages', image); // Ensure this key is what your backend expects
      });
  
      // Make the API call to update the car
      await axios.put(
        `${import.meta.env.VITE_API_URL}/cars/${id}`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      // Clear file input and reset state
      setSelectedImages([]);
      setRemovedImages([]);
      document.querySelector('input[type="file"]').value = '';
  
      navigate('/AdminCarDisply'); // Navigate to the AdminCarDisplay page
    } catch (error) {
      console.error('Error updating car:', error.response || error.message);
      alert('Failed to update car.');
    }
  };
  
  
  
  


  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    // <div className="update-form-container">
    //   <h2>Update Car</h2>
    //   <div className="form-columns">
    //     <div className="form-column">
    //   <input
    //     type="text"
    //     name="carName"
    //     value={formData.carName}
    //     onChange={handleChange}
    //     placeholder="Car Name"
    //   />
    //   <input
    //     type="text"
    //     name="price"
    //     value={formData.price}
    //     onChange={handleChange}
    //     placeholder="price"
    //   />
    //   <input
    //     type="text"
    //     name="description"
    //     value={formData.description}
    //     onChange={handleChange}
    //     placeholder="Description"
    //   />
    //   <input
    //     type="text"
    //     name="company"
    //     value={formData.company}
    //     onChange={handleChange}
    //     placeholder="Company"
    //   />
    //   <input
    //     type="text"
    //     name="color"
    //     value={formData.color}
    //     onChange={handleChange}
    //     placeholder="Color"
    //   />
    //   <input
    //     type="text"
    //     name="model"
    //     value={formData.model}
    //     onChange={handleChange}
    //     placeholder="Model"
    //   />
    //   <input
    //     type="text"
    //     name="milesRun"
    //     value={formData.milesRun}
    //     onChange={handleChange}
    //     placeholder="Miles Run"
    //   />
    //   <input
    //     type="text"
    //     name="fuelType"
    //     value={formData.fuelType}
    //     onChange={handleChange}
    //     placeholder="Fuel Type"
    //   />
    //   <input
    //     type="text"
    //     name="transmission"
    //     value={formData.transmission}
    //     onChange={handleChange}
    //     placeholder="Transmission"
    //   />
    //   <input
    //     type="text"
    //     name="guarantee"
    //     value={formData.guarantee}
    //     onChange={handleChange}
    //     placeholder="Guarantee"
    //   />
    //   <input
    //     type="number"
    //     name="numberOfPassengers"
    //     value={formData.numberOfPassengers}
    //     onChange={handleChange}
    //     placeholder="Number of Passengers"
    //   />
    //   </div>

    //   <div className="form-column">
    //   <div className="equipments">
    //     <label>
    //       <input
    //         type="checkbox"
    //         name="ac"
    //         checked={formData.equipments.ac}
    //         onChange={handleEquipmentsChange}
    //       />
    //       AC
    //     </label>
    //     <label>
    //       <input
    //         type="checkbox"
    //         name="heater"
    //         checked={formData.equipments.heater}
    //         onChange={handleEquipmentsChange}
    //       />
    //       Heater
    //     </label>
    //     <label>
    //       <input
    //         type="checkbox"
    //         name="tracker"
    //         checked={formData.equipments.tracker}
    //         onChange={handleEquipmentsChange}
    //       />
    //       Tracker
    //     </label>
    //     <label>
    //       <input
    //         type="checkbox"
    //         name="bluetooth"
    //         checked={formData.equipments.bluetooth}
    //         onChange={handleEquipmentsChange}
    //       />
    //       Bluetooth
    //     </label>
    //     <label>
    //       <input
    //         type="checkbox"
    //         name="gps"
    //         checked={formData.equipments.gps}
    //         onChange={handleEquipmentsChange}
    //       />
    //       GPS
    //     </label>
    //     <label>
    //       <input
    //         type="checkbox"
    //         name="radar"
    //         checked={formData.equipments.radar}
    //         onChange={handleEquipmentsChange}
    //       />
    //       Radar
    //     </label>
    //     <label>
    //       <input
    //         type="checkbox"
    //         name="abs"
    //         checked={formData.equipments.abs}
    //         onChange={handleEquipmentsChange}
    //       />
    //       ABS
    //     </label>
    //     <label>
    //       <input
    //         type="checkbox"
    //         name="climatiseur"
    //         checked={formData.equipments.climatiseur}
    //         onChange={handleEquipmentsChange}
    //       />
    //       climatiseur
    //     </label>
    //     <label>
    //       <input
    //         type="checkbox"
    //         name="powerDoorLocks"
    //         checked={formData.equipments.powerDoorLocks}
    //         onChange={handleEquipmentsChange}
    //       />
    //       powerDoorLocks
    //     </label>
    //   </div>

      


    //   <div className="image-upload-section">
    //   <input
    //     type="file"
    //     name="images"
    //     multiple
    //     onChange={handleImageChange}
    //   />
    //   <button onClick={handleUpdate}>Update Car</button>
    //   </div>

    //   <div className="image-preview">
    //     {currentImages.length > 0 && currentImages.map((image, index) => (
    //       <div key={index} className="image-container">
    //         <img
    //           src={image}  // Assuming the image URL is relative to your API
    //           alt={`Current Image ${index + 1}`}
    //           className="current-image"
    //           onError={(e) => e.target.src = "/default-car-image.jpg"} // Fallback image
    //         />
    //         <button onClick={() => handleRemoveCurrentImage(index)} className="remove-image-btn">Remove</button>
    //       </div>
    //     ))}
      

      
    //     {selectedImages.length > 0 && (
    //       <div className="image-preview-selected">
    //         {
    //       [...selectedImages].map((image, index) => (
    //       <div key={index} className="image-container">
    //         <img
    //           src={URL.createObjectURL(image)}
    //           alt={`Selected Image ${index + 1}`}
    //           className="selected-image"
    //           onError={(e) => e.target.src = "/default-car-image.jpg"} // Fallback image
    //         />
    //        <button type="button" onClick={() => handleRemoveSelectedImage(index)}>Remove</button>
    //               </div>
    //             ))}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>


    <div className="update-form-container">
    <h2>Update Car</h2>
    <div className="form-columns">
      <div className="form-column">
        <input
          type="text"
          name="carName"
          value={formData.carName}
          onChange={handleChange}
          placeholder="Car Name"
          className="long-input"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="long-input"
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
        />
        <div className="form-row">
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Color"
          />
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Model"
          />
          <input
            type="text"
            name="milesRun"
            value={formData.milesRun}
            onChange={handleChange}
            placeholder="Miles Run"
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            placeholder="Fuel Type"
          />
          <input
            type="text"
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            placeholder="Transmission"
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="guarantee"
            value={formData.guarantee}
            onChange={handleChange}
            placeholder="Guarantee"
          />
          <input
            type="number"
            name="numberOfPassengers"
            value={formData.numberOfPassengers}
            onChange={handleChange}
            placeholder="Number of Passengers"
          />
        </div>
        <div className="equipments">
          <div className="equipments-row">
            <label>
              <input
                type="checkbox"
                name="ac"
                checked={formData.equipments.ac}
                onChange={handleEquipmentsChange}
              />
              AC
            </label>
            <label>
              <input
                type="checkbox"
                name="heater"
                checked={formData.equipments.heater}
                onChange={handleEquipmentsChange}
              />
              Heater
            </label>
            <label>
              <input
                type="checkbox"
                name="tracker"
                checked={formData.equipments.tracker}
                onChange={handleEquipmentsChange}
              />
              Tracker
            </label>
            <label>
              <input
                type="checkbox"
                name="bluetooth"
                checked={formData.equipments.bluetooth}
                onChange={handleEquipmentsChange}
              />
              Bluetooth
            </label>
          
            <label>
              <input
                type="checkbox"
                name="gps"
                checked={formData.equipments.gps}
                onChange={handleEquipmentsChange}
              />
              GPS
            </label>
            <label>
              <input
                type="checkbox"
                name="radar"
                checked={formData.equipments.radar}
                onChange={handleEquipmentsChange}
              />
              Radar
            </label>
            <label>
              <input
                type="checkbox"
                name="abs"
                checked={formData.equipments.abs}
                onChange={handleEquipmentsChange}
              />
              ABS
            </label>
            <label>
              <input
                type="checkbox"
                name="climatiseur"
                checked={formData.equipments.climatiseur}
                onChange={handleEquipmentsChange}
              />
              Climatiseur
            </label>
          
            <label>
              <input
                type="checkbox"
                name="powerDoorLocks"
                checked={formData.equipments.powerDoorLocks}
                onChange={handleEquipmentsChange}
              />
              Power Door Locks
            </label>
          </div>
        </div>
        <div className="image-upload-section">
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
          />
          <button onClick={handleUpdate}>Update Car</button>
        </div>
        <div className="image-preview">
          {currentImages.length > 0 && currentImages.map((image, index) => (
            <div key={index} className="image-container">
              <img
                src={image} // Assuming the image URL is relative to your API
                alt={`Current Image ${index + 1}`}
                className="current-image"
                onError={(e) => e.target.src = "/default-car-image.jpg"} // Fallback image
              />
              <button onClick={() => handleRemoveCurrentImage(index)} className="remove-image-btn">Remove</button>
            </div>
          ))}
          {selectedImages.length > 0 && (
            <div className="image-preview-selected">
              {Array.from(selectedImages).map((image, index) => (
                <div key={index} className="image-container">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Selected Image ${index + 1}`}
                    className="selected-image"
                    onError={(e) => e.target.src = "/default-car-image.jpg"} // Fallback image
                  />
                  <button type="button" onClick={() => handleRemoveSelectedImage(index)}>Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
};
