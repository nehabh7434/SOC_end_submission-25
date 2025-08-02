import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../axiosConfig';

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`videos/${id}/`)
      .then(res => setVideo(res.data))
      .catch(err => console.error(err));

    // Load comments from localStorage
    const stored = JSON.parse(localStorage.getItem('comments') || '{}');
    setComments(stored[id] || []);
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    const newComment = {
      text: comment,
      time: new Date().toLocaleString()
    };

    const updated = [...comments, newComment];

    // Save to state
    setComments(updated);
    setComment('');

    // Save to localStorage
    const allComments = JSON.parse(localStorage.getItem('comments') || '{}');
    allComments[id] = updated;
    localStorage.setItem('comments', JSON.stringify(allComments));
  };

  const pageStyle = {
    paddingTop: '80px',
    paddingLeft: '220px',
    paddingRight: '20px',
    paddingBottom: '20px',
  };

  return (
    <div style={pageStyle}>
      <Link to="/" className="btn btn-outline-secondary mb-3">← Back to Home</Link>

      {video ? (
        <div className="card shadow-sm mb-4">
          <video controls autoPlay width="100%" style={{ maxHeight: '500px' }}>
            <source src={`http://127.0.0.1:8000${video.video_file}`} type="video/mp4" />
          </video>
          <div className="card-body">
            <h4>{video.title}</h4>
            <p>{video.description}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <h5>Comments 💬</h5>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="form-control mb-2"
          rows="2"
          placeholder="Write a comment..."
          required
        />
        <button className="btn btn-primary btn-sm">Post Comment</button>
      </form>

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="list-group">
          {comments.map((c, index) => (
            <li key={index} className="list-group-item">
              <p className="mb-1">{c.text}</p>
              <small className="text-muted">{c.time}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VideoPlayer;


