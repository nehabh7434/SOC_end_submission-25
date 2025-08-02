import React from 'react';

const dummyShorts = [
  {
    id: 1,
    title: "CSS Tricks in 10s",
    video_url: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 2,
    title: "React useState Explained",
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 3,
    title: "Python One-liner Magic",
    video_url: "https://www.w3schools.com/html/movie.mp4",
  },
];

function Shorts() {
  return (
    <div style={{ paddingTop: '80px', paddingLeft: '220px', paddingRight: '20px' }}>
      <h2 className="mb-4">YouTube Shorts</h2>
      <div className="row g-4">
        {dummyShorts.map(short => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={short.id}>
            <div className="card shadow-sm">
              <video
                controls
                style={{ height: '400px', objectFit: 'cover' }}
                className="card-img-top"
              >
                <source src={short.video_url} type="video/mp4" />
              </video>
              <div className="card-body text-center">
                <h6 className="fw-bold">{short.title}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shorts;

