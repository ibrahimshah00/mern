import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import CheckoutForm from './CheckoutForm';
import { useAuth } from '../Context/AuthContext';
const CarDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const { auth } = useAuth();  // Get authentication state
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cars/${id}`);
        setCar(response.data);
      } catch (err) {
        setError('Error fetching car details');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleNextImage = () => {
    if (car && car.pictures.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car.pictures.length);
    }
  };

  const handlePrevImage = () => {
    if (car && car.pictures.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? car.pictures.length - 1 : prevIndex - 1
      );
    }
  };

  const handleReserveClick = () => {
    if (!auth.isAuthenticated) {
      alert("You need to log in to perform this action.");
      navigate("/admin"); // Redirect to the login page
      return;
    }
    const phoneNumber = '+923345310281';
    const message = `Hello, I am interested in reserving the car: ${car.carName}. Could you provide more details?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleReserve = () => {
    if (!auth.isAuthenticated) {
      alert("You need to log in to perform this action.");
      navigate("/admin"); // Redirect to the login page
      return;
    }
    if (car) {
      const mailtoLink = `mailto:ibrahimibnanwar001@gmail.com?subject=Reserve%20Car&body=I%20would%20like%20to%20reserve%20the%20car:%20${encodeURIComponent(car.carName)}`;
      window.location.href = mailtoLink;
    }
  };

  const toggleSidebar = () => {
    if (!auth.isAuthenticated) {
      alert("You need to log in to perform this action.");
      navigate("/admin"); // Redirect to the login page
      return;
    }
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cardetail-detail-page">
      <div className="cardetail-main">
        <div className="cardetail-image">
          {car && car.pictures.length > 0 && (
            <>
              <img src={car.pictures[currentImageIndex]} alt={car.carName} />
              <div className="image-navigation">
                <button onClick={handlePrevImage}>Back</button>
                <button onClick={handleNextImage}>Next</button>
              </div>
            </>
          )}
        </div>
        <div className="cardetail-info">
          <h1>{car.carName}</h1>
          <p><strong>Price:</strong>$ {car.price}</p>
          <p><strong>Description:</strong> {car.description}</p>
          <button className="reserve-button" onClick={handleReserveClick}>Ask on Whatsapp</button>
          <button className="reserve-button" onClick={handleReserve}>Ask on Email</button>
          <button className="reserve-button" onClick={toggleSidebar}>Buy</button>
        </div>
      </div>

      <div className="cardetail-detail">
        <h2>Details</h2>
        <div className="cardetail-maindetail">
          <div className="detail-box">
            <p><strong>Model:</strong> <span className="detail-value">{car.model}</span></p>
          </div>
          <div className="detail-box">
            <p><strong>Company:</strong> <span className="detail-value">{car.company}</span></p>
          </div>
          <div className="detail-box">
            <p><strong>Color:</strong> <span className="detail-value">{car.color}</span></p>
          </div>
          <div className="detail-box">
            <p><strong>Guarantee:</strong> <span className="detail-value">{car.guarantee}</span></p>
          </div>
          <div className="detail-box">
            <p><strong>Number of Passengers:</strong> <span className="detail-value">{car.numberOfPassengers}</span></p>
          </div>
          <div className="detail-box">
            <p><strong>Available:</strong> <span className="detail-value">{car.isAvailable ? 'Yes' : 'No'}</span></p>
          </div>
          <div className="detail-box">
            <p><strong>Miles Run:</strong> <span className="detail-value">{car.milesRun}</span></p>
          </div>
          <div className="detail-box">
            <p><strong>Fuel Type:</strong> <span className="detail-value">{car.fuelType}</span></p>
          </div>
        </div>

        <div className="cardetail-equipment">
          <h2>Equipment</h2>
          <ul>
            {car.equipments && Object.entries(car.equipments).map(([equipment, isAvailable]) => (
              isAvailable ? <li key={equipment}>{equipment}</li> : null
            ))}
          </ul>
        </div>
      </div>

      {isSidebarOpen && (
        
        <div className={`cardetail-sidebar payment ${isSidebarOpen ? 'open' : ''}`}>
          <div className="carddetaildesign">
          <div className="innercarddetaildesign">

          <button className="close-sidebar" onClick={toggleSidebar}>Close</button>
          <CheckoutForm car={car} closeSidebar={toggleSidebar} />
          </div></div>
        </div>
      )}
    </div>
  );
};

export default CarDetailPage;
