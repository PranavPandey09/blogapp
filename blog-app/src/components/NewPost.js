import React, { useState } from 'react';
import axios from 'axios';
import './NewPost.css';

const NewPost = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title || !content) {
      setError('Both title and content are required.');
      return;
    }

    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      // Send post data to backend
      const response = await axios.post('https://blogapp-xyqa.vercel.app/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      addPost(response.data); // Add the post in the frontend state
      alert('Post added successfully!');
      setTitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className="newpost-container">
      <div className="form-box">
        <h2>Create New Post</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Post Content"
            required
          ></textarea>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit">Add Post</button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
