
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyNewMessage.css';

const MyNewMessage = () => {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace 'http://localhost:5000' with your Vercel backend URL
        const response = await axios.get('https://blogapp-xyqa.vercel.app/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Update delete request URL to point to the deployed backend
      await axios.delete(`https://blogapp-xyqa.vercel.app/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = (post) => {
    setIsEditing(true);
    setCurrentPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleSave = async () => {
    try {
      const updatedPost = {
        title: editTitle,
        content: editContent,
      };

      // Update the URL for saving edited posts
      await axios.put(`https://blogapp-xyqa.vercel.app/api/posts/${currentPost._id}`, updatedPost);
      setPosts(posts.map((post) => (post._id === currentPost._id ? { ...post, ...updatedPost } : post)));
      setIsEditing(false);
      setCurrentPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="message-container">
      {isEditing ? (
        <div className="edit-form">
          <h3>Edit Post</h3>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Edit Title"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Edit Content"
          ></textarea>
          <button onClick={handleSave}>Save Changes</button>
        </div>
      ) : posts.length === 0 ? (
        <h2>No added posts</h2>
      ) : (
        posts.map((post) => (
          <div className="post-item" key={post._id}>
            <h3>{post.title}</h3>
            {post.image && <img src={post.image} alt="Post" className="post-image" />}
            <p>{post.content}</p>
            <button className="edit-button" onClick={() => handleEdit(post)}>Edit Post</button>
            <button className="delete-button" onClick={() => handleDelete(post._id)}>Delete Post</button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyNewMessage;
