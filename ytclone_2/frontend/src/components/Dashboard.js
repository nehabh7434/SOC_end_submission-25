import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

function Dashboard() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('videos/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      }
    })
      .then(res => {
        const userId = parseJwt(localStorage.getItem('access'))?.user_id;
        const userVideos = res.data.filter(v => v.user === userId);
        setVideos(userVideos);
      })
      .catch(err => console.error('Error fetching dashboard videos', err));
  }, []);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const pageStyle = {
    paddingTop: '80px',      // below navbar
    paddingLeft: '220px',    // beside sidebar
    paddingRight: '20px',
    paddingBottom: '20px'
  };

  return (
    <div style={pageStyle}>
      <h2 className="mb-4">Your Uploaded Videos</h2>
      {videos.length === 0 ? (
        <p>You haven't uploaded any videos yet.</p>
      ) : (
        <div className="row g-3">
          {videos.map(video => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={video.id}>
              <div className="card h-100 shadow-sm">
                <video controls height="160" className="card-img-top">
                  <source src={`http://127.0.0.1:8000${video.video_file}`} />
                </video>
                <div className="card-body">
                  <h6 className="fw-bold">{video.title}</h6>
                  <p className="text-muted small">{video.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
