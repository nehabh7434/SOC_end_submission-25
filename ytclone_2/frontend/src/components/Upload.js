import React, { useState } from 'react';
import axios from '../axiosConfig';

function Upload() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    video_file: null,
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'video_file') {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('video_file', form.video_file);

    try {
      await axios.post('videos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });
      alert('Video uploaded!');
    } catch (err) {
      alert('Upload failed.');
    }
  };

  const pageStyle = {
    paddingTop: '80px',     // space below navbar
    paddingLeft: '220px',   // space right of sidebar
    paddingRight: '20px',
    paddingBottom: '20px'
  };

  return (
    <div style={pageStyle}>
      <h2 className="mb-4">Upload Video</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Video Title"
          required
        />
        <textarea
          name="description"
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Description"
          required
        />
        <input
          type="file"
          name="video_file"
          accept="video/*"
          onChange={handleChange}
          className="form-control mb-3"
          required
        />
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
}

export default Upload;
