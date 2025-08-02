import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top px-4 d-flex justify-content-between" style={{ zIndex: 1000 }}>
      <Link className="navbar-brand" to="/">YT Clone</Link>
      <div className="d-flex align-items-center gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="btn btn-sm btn-light"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        <Link to="/upload" className="btn btn-outline-light btn-sm">Upload</Link>
        <Link to="/dashboard" className="btn btn-outline-light btn-sm">Dashboard</Link>
        <Link to="/login" className="btn btn-light btn-sm">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;


