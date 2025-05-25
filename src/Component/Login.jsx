
  import React, { useState } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import { useAuth } from '../Component/Context/AuthContext';

  const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth(); // Use the login function from AuthContext
    const navigate = useNavigate();

    const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const onSubmit = async (e) => {
    //   e.preventDefault();
    //   try {
    //     const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
        
    //     localStorage.setItem('authToken', response.data.token);
    //     // localStorage.setItem('authToken', String(token));
    //      console.log("Stored token:", localStorage.getItem('authToken')); // Check immediately after storing
    
    //   //   const res = await axios.post('http://localhost:5000/api/auth/login', formData);
    //   // localStorage.setItem('token', res.data.token);
    //     const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/auth/user`, {
    //       headers: { Authorization: `Bearer ${response.data.token}` },
    //     });
    //     const user = userResponse.data;

    //     login(user); // Update the auth state
    //     alert('Logged in successfully');

    //     if (user.role === 'admin') {
    //       navigate('/dashboard');
    //     } else {
    //       navigate('/');
    //     }
    //   } catch (error) {
    //     console.error('Error:', error.response ? error.response.data : error.message);
    //     setError(error.response?.data?.msg || 'Error logging in');
    //   }
    // };
    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
        const token = response.data.token;
        
        console.log("Received token:", token); // Log the received token
        localStorage.setItem('authToken', token);
        
        const storedToken = localStorage.getItem('authToken');
        console.log("Stored token:", storedToken); // Log the stored token
        
        const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = userResponse.data;
    
        login(user); // Update the auth state
        alert('Logged in successfully');
    
        if (user.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        setError(error.response?.data?.msg || 'Error logging in');
      }
    };

    
    return (
      <div className="login-page">
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <form className="login-form" onSubmit={onSubmit}>
          <h3>Login Here</h3>
          <div>
            <label>Username</label>
            <input type="email" placeholder='Enter Email Here' name="email" id="username" value={formData.email} onChange={onChange} required style={{border:'0.1px solid #d2d2d2'}} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder='Enter Password Here' name="password" value={formData.password} onChange={onChange} required style={{border:'0.1px solid #d2d2d2'}} />
          </div>
          <button type="submit">Login</button>
          <div className="social">
            <div className="go"><i className="fab fa-google"></i> Google</div>
            <div className="fb"><i className="fab fa-facebook"></i> Facebook</div>
            <div className="fb"><i className="fab fa-facebook"></i> Signup</div>
          </div>
        </form>
      </div>
    );
  };

  export default Login;
