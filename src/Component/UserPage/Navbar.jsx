
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Navbar({ onCompanySelect }) {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  // Fetch car companies from the API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cars/stats/companies');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <>
         
      <nav id="menu">
        <div className="menu-itemm">
          <div className="menu-text">
            <a href="/" onClick={() => onCompanySelect('')}>Home</a>
          </div>
        </div>

         <div className="menu-itemm">
          <div className="menu-text">
            <a href="/contact" onClick={() => onCompanySelect('')}>Contact</a>
          </div>
        </div>
        <div className="menu-item highlight">
          <div className="menu-text">
            <a href="/">Companies</a>
          </div>
          <div className="sub-menu double">
       
            {companies.map((company, index) => (
              <a href="#" key={index} onClick={() => onCompanySelect(company)}>
                <div className="icon-box gb a">
                  <div className="icon"></div>
                  <div className="text">
                    <div className="title">{company} </div>
                  </div>
                </div>
              </a>
            ))}
            
            <div className="sub-menu-holder"></div>
          </div>
          
        </div>

        <div className="menu-itemm">
          <div className="menu-text">
            <a href="/" onClick={() => onCompanySelect('')}>About Us</a>
          </div>
        </div>
        
          <div id="sub-menu-container">
            <div id="sub-menu-holder">
              <div id="sub-menu-bottom"></div>
            </div>
          </div>
      </nav>
    </>
  );
}
