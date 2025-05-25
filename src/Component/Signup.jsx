
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // Default role
  });
  const [message, setMessage] = useState('');
  const { name, email, password } = formData;
  const navigate = useNavigate(); // Initialize the navigate hook

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message before new request
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData);
      setMessage('User registered successfully');
      navigate('/'); // Redirect to homepage
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setMessage(error.response?.data?.msg || 'Error registering user');
    }
  };

  return (
    <div className="login-page">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
      <form onSubmit={onSubmit} className="login-form">
        <h3>Signup Here</h3>
        <div>
          <label>Name</label>
          <input type="text" name="name" placeholder='Enter your name' id="username" value={name} onChange={onChange} required style={{ border: '0.1px solid #d2d2d2' }} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" placeholder='Enter Email' value={email} onChange={onChange} required style={{ border: '0.1px solid #d2d2d2' }} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" placeholder='Enter Password' value={password} onChange={onChange} required style={{ border: '0.1px solid #d2d2d2' }} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
