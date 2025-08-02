import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/users/', user);
      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed.');
    }
  };

  return (
    <div className="container" style={{ marginLeft: '220px', paddingTop: '20px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" onChange={handleChange} className="form-control mb-2" placeholder="Username" />
        <input name="password" type="password" onChange={handleChange} className="form-control mb-2" placeholder="Password" />
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
}

export default Register;
