import React from 'react';
import { Link } from 'react-router-dom';
import {
  House, Clock, Heart, CloudUpload, Film, User, History, Library, Search, Layers3, Youtube
} from 'lucide-react';

function Sidebar() {
  return (
    <div
      className="bg-light border-end d-flex flex-column position-fixed"
      style={{
        width: '220px',
        height: '100vh',
        top: '56px', // Navbar height
        left: 0,
        padding: '20px 10px',
        overflowY: 'auto'
      }}
    >
      <h6 className="text-muted">Menu</h6>
      <ul className="nav flex-column">
        <li className="nav-item"><Link to="/" className="nav-link"><House size={18} className="me-2" /> Home</Link></li>
        <li className="nav-item"><Link to="/shorts" className="nav-link"><Film size={18} className="me-2" /> Shorts</Link></li>
        <li className="nav-item"><Link to="/subscriptions" className="nav-link"><User size={18} className="me-2" /> Subscriptions</Link></li>
        <hr />
        <li className="nav-item"><Link to="/dashboard" className="nav-link"><CloudUpload size={18} className="me-2" /> Your Videos</Link></li>
        <li className="nav-item"><Link to="/watchlater" className="nav-link"><Clock size={18} className="me-2" /> Watch Later</Link></li>
        <li className="nav-item"><Link to="/liked" className="nav-link"><Heart size={18} className="me-2" /> Liked Videos</Link></li>
        <li className="nav-item"><Link to="/library" className="nav-link"><Library size={18} className="me-2" /> Library</Link></li>
        <li className="nav-item"><Link to="/history" className="nav-link"><History size={18} className="me-2" /> History</Link></li>
        <li className="nav-item"><Link to="/explore" className="nav-link"><Search size={18} className="me-2" /> Explore</Link></li>
        <li className="nav-item"><Link to="/categories" className="nav-link"><Layers3 size={18} className="me-2" /> Categories</Link></li>
        <li className="nav-item"><Link to="/ytmusic" className="nav-link"><Youtube size={18} className="me-2" /> YouTube Music</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;


