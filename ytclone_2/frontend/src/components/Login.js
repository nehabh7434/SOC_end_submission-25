import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('token/', credentials);
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert('Login failed. Please check your username and password.');
    }
  };

  const pageStyle = {
    paddingTop: '80px',     // space under navbar
    paddingLeft: '220px',   // space next to sidebar
    paddingRight: '20px',
    paddingBottom: '20px',
    maxWidth: '500px',
  };

  return (
    <div style={pageStyle}>
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Username"
          required
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Password"
          required
        />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;

