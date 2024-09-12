import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MyNewMessage from './components/MyNewMessage';
import NewPost from './components/NewPost';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  const handleDelete = (index) => {
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);
  };

  const handleEdit = (index, updatedPost) => {
    const updatedPosts = [...posts];
    updatedPosts[index] = updatedPost;
    setPosts(updatedPosts);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/mynewmessage"
          element={<MyNewMessage posts={posts} handleDelete={handleDelete} handleEdit={handleEdit} />}
        />
        <Route path="/newpost" element={<NewPost addPost={addPost} />} />
      </Routes>
    </Router>
  );
}

export default App;
