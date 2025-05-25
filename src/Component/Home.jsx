// src/pages/Home.jsx
import React, { useEffect } from 'react';
import axios from 'axios';
import Sidebar from './adminpages/sidebar';
import Dashboard from './adminpages/Dashboard';

const Home = ({ user, setUser }) => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [setUser]);

  return (
    <div>
      <div className="container">
       
        <div className="maindashboard">
            <Dashboard/>    
        </div> 
      </div>
    </div>
  );
};

export default Home;
