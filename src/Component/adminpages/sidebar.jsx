import React, { useState, useEffect } from 'react';
import { NavLink ,Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple,faPerson,faCar,faRightToBracket,faCableCar,faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const Sidebar = () => {
  const [companies, setCompanies] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

      const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-text">Devias</span>
          <span className="logo-subtext">Production</span>
        </div>
      </div>
      <nav className="sidebar-nav">
      
        <NavLink to="/dashboard" activeClassName="active" className="nav-link">
        <FontAwesomeIcon icon={faChartSimple} />Dashboard
        </NavLink>
        <NavLink to="/AdminCarDisply" activeClassName="active" className="nav-link">
        <FontAwesomeIcon icon={faCar}/> Cars
        </NavLink>
        <NavLink to="/purchases" activeClassName="active" className="nav-link">
        <i className="fas fa-users"></i> Customers
        </NavLink>
        {/* <NavLink to="/companies" activeClassName="active" className="nav-link">
        <FontAwesomeIcon icon={faCableCar}/> Companies
        </NavLink> */}
          <div className="dropdown">
          <div className="nav-link" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faCableCar} /> Companies
            <FontAwesomeIcon icon={isDropdownOpen ? faChevronUp : faChevronDown} style={{ marginLeft: '8px' }} />
          </div>
          {isDropdownOpen && (
            <ul className="dropdown-content">
              {companies.map((company, index) => (
                <li key={index}>
                  <Link to={`/AdminCarDisply/${company}`}>{company}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <NavLink to="/user-list" activeClassName="active" className="nav-link">
        <FontAwesomeIcon icon={faRightToBracket}/> Register User
        </NavLink>
       
        
      </nav>
    </div>
  );
};

export default Sidebar;


