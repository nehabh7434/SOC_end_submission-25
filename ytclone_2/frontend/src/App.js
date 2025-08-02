import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Upload from './components/Upload';
import Dashboard from './components/Dashboard';
import VideoPlayer from './components/VideoPlayer';
import Shorts from './components/Shorts';
import Subscriptions from './components/Subscriptions';
import WatchLater from './components/WatchLater';
import Liked from './components/Liked';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <div style={{ marginLeft: '220px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path="/shorts" element={<Shorts />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/watchlater" element={<WatchLater />} />
          <Route path="/liked" element={<Liked />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

