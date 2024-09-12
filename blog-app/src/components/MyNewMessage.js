// import React, { useState } from 'react';
// import './MyNewMessage.css';

// const MyNewMessage = ({ posts, handleDelete, handleEdit }) => {
//   const [editIndex, setEditIndex] = useState(null);
//   const [editedTitle, setEditedTitle] = useState('');
//   const [editedContent, setEditedContent] = useState('');
//   const [editedImage, setEditedImage] = useState(null);

//   const startEditing = (index) => {
//     setEditIndex(index);
//     setEditedTitle(posts[index].title);
//     setEditedContent(posts[index].content);
//     setEditedImage(posts[index].image);
//   };

//   const saveEdit = () => {
//     handleEdit(editIndex, {
//       title: editedTitle,
//       content: editedContent,
//       image: editedImage,
//     });
//     setEditIndex(null); // Stop editing after saving
//   };

//   const cancelEdit = () => {
//     setEditIndex(null); // Cancel edit mode
//   };

//   return (
//     <div className="message-container">
//       {posts.length === 0 ? (
//         <h2>No added posts</h2>
//       ) : (
//         posts.map((post, index) => (
//           <div className="post-item" key={index}>
//             {editIndex === index ? (
//               <div className="edit-form">
//                 <input
//                   type="text"
//                   value={editedTitle}
//                   onChange={(e) => setEditedTitle(e.target.value)}
//                   placeholder="Edit Title"
//                 />
//                 <textarea
//                   value={editedContent}
//                   onChange={(e) => setEditedContent(e.target.value)}
//                   placeholder="Edit Content"
//                 ></textarea>
//                 <input
//                   type="file"
//                   onChange={(e) =>
//                     setEditedImage(URL.createObjectURL(e.target.files[0]))
//                   }
//                 />
//                 <div className="button-group">
//                   <button className="save-btn" onClick={saveEdit}>
//                     Save
//                   </button>
//                   <button className="cancel-btn" onClick={cancelEdit}>
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <h3>{post.title}</h3>
//                 {post.image && <img src={post.image} alt="Post" className="post-image" />}
//                 <p>{post.content}</p>
//                 <div className="button-group">
//                   <button className="edit-btn" onClick={() => startEditing(index)}>
//                     Edit
//                   </button>
//                   <button className="delete-btn" onClick={() => handleDelete(index)}>
//                     Delete
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default MyNewMessage;
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
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
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

      await axios.put(`http://localhost:5000/api/posts/${currentPost._id}`, updatedPost);
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
