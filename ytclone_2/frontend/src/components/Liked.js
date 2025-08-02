import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Liked() {
  const [likedVideos, setLikedVideos] = useState([]);

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem('liked') || '[]');
    setLikedVideos(liked);
  }, []);

  return (
    <div style={{ paddingTop: '80px', paddingLeft: '220px', paddingRight: '20px', paddingBottom: '20px' }}>
      <h2 className="mb-4">Liked Videos ❤️</h2>

      {likedVideos.length === 0 ? (
        <p>You haven't liked any videos yet.</p>
      ) : (
        <div className="row g-3">
          {likedVideos.map(video => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={video.id}>
              <div className="card h-100 shadow-sm">
                <video controls height="160" className="card-img-top">
                  <source src={video.video_url} type="video/mp4" />
                </video>
                <div className="card-body d-flex flex-column">
                  <h6 className="fw-bold">{video.title}</h6>
                  <p className="text-muted small">{video.description}</p>
                  <Link to={`/video/${video.id}`} className="btn btn-sm btn-primary mt-auto">▶️ Watch</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Liked;

