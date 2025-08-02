import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock } from 'lucide-react';

const dummyVideos = [
  {
    id: 1,
    title: "React Crash Course",
    description: "Learn React in 30 minutes.",
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    title: "Django API Tutorial",
    description: "Build REST APIs using Django Rest Framework.",
    video_url: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 3,
    title: "YouTube Clone Build",
    description: "Complete walkthrough of a full-stack project.",
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 4,
    title: "HTML for Beginners",
    description: "Learn basic HTML with hands-on practice.",
    video_url: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 5,
    title: "CSS Flexbox Explained",
    description: "Master layout with CSS Flexbox.",
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 6,
    title: "React Crash Course",
    description: "Learn React in 30 minutes.",
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 7,
    title: "Django API Tutorial",
    description: "Build REST APIs using Django Rest Framework.",
    video_url: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 8,
    title: "React Crash Course",
    description: "Learn React in 30 minutes.",
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];


function Sidebar() {
  return (
    <div className="sidebar" style={{
      width: '220px',
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100vh',
      paddingTop: '80px',
      backgroundColor: '#f8f9fa',
      borderRight: '1px solid #dee2e6',
      overflowY: 'auto'
    }}>
      <div className="px-3 py-2">
        <h6 className="px-2 fw-bold">Menu</h6>
        <ul className="nav flex-column">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/shorts">Shorts</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/subscriptions">Subscriptions</Link></li>
        </ul>

        <h6 className="px-2 mt-4 fw-bold">Your Videos</h6>
        <ul className="nav flex-column">
          <li className="nav-item"><Link className="nav-link" to="/watch-later">Watch Later</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/liked-videos">Liked Videos</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/library">Library</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/history">History</Link></li>
        </ul>

        <h6 className="px-2 mt-4 fw-bold">Explore</h6>
        <ul className="nav flex-column">
          <li className="nav-item"><Link className="nav-link" to="/categories">Categories</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/music">YouTube Music</Link></li>
        </ul>
      </div>
    </div>
  );
}

function Home() {
  const [liked, setLiked] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const likedFromStorage = JSON.parse(localStorage.getItem('liked') || '[]');
    const watchFromStorage = JSON.parse(localStorage.getItem('watchlater') || '[]');
    setLiked(likedFromStorage);
    setWatchLater(watchFromStorage);
  }, []);

  const toggleLike = video => {
    let updated;
    if (liked.some(v => v.id === video.id)) {
      updated = liked.filter(v => v.id !== video.id);
    } else {
      updated = [...liked, video];
    }
    setLiked(updated);
    localStorage.setItem('liked', JSON.stringify(updated));
  };

  const toggleWatchLater = video => {
    let updated;
    if (watchLater.some(v => v.id === video.id)) {
      updated = watchLater.filter(v => v.id !== video.id);
    } else {
      updated = [...watchLater, video];
    }
    setWatchLater(updated);
    localStorage.setItem('watchlater', JSON.stringify(updated));
  };

  const filteredVideos = dummyVideos.filter(v =>
    v.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="content-area" style={{
        marginLeft: '220px',
        padding: '20px',
        width: 'calc(100% - 220px)'
      }}>
        <h2 className="mb-4">All Videos</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search videos..."
            className="form-control w-50"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="row g-3">
          {filteredVideos.map(video => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={video.id}>
              <div className="card h-100 shadow-sm">
                <video controls height="160" className="card-img-top">
                  <source src={video.video_url} type="video/mp4" />
                </video>
                <div className="card-body d-flex flex-column">
                  <h6 className="fw-bold">{video.title}</h6>
                  <p className="text-muted small">{video.description}</p>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div className="d-flex gap-2">
                      <Link to={`/video/${video.id}`} className="btn btn-sm btn-primary">Watch</Link>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.origin + `/video/${video.id}`);
                          alert('Video link copied!');
                        }}
                      >
                        Share
                      </button>
                    </div>
                    <div>
                      <span
                        onClick={() => toggleLike(video)}
                        style={{
                          cursor: 'pointer',
                          fontSize: '20px',
                          marginRight: '10px',
                        }}
                        title="Like"
                      >
                        {liked.some(v => v.id === video.id) ? '❤️' : '🤍'}
                      </span>

                      <Clock
                        onClick={() => toggleWatchLater(video)}
                        color={watchLater.some(v => v.id === video.id) ? 'blue' : 'gray'}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;