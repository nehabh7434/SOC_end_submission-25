import React, { useEffect, useState } from 'react';

function WatchLater() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('watchlater') || '[]');
    setVideos(saved);
  }, []);

  return (
    <div className="container" style={{ marginLeft: '220px', paddingTop: '20px' }}>
      <h2>Watch Later</h2>
      <div className="row">
        {videos.map(video => (
          <div className="col-md-4 mb-3" key={video.id}>
            <div className="card">
              <video controls height="200">
                <source src={video.video_url} />
              </video>
              <div className="card-body">
                <h5>{video.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchLater;

