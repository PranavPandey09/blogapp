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
import './MyNewMessage.css'; // Make sure to style the buttons and posts here

const MyNewMessage = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the backend API deployed on Vercel
  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://blogapp-gray-phi.vercel.app/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Delete post by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://blogapp-gray-phi.vercel.app/api/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id)); // Remove the deleted post from the list
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="my-new-message-container">
      <h2>My New Messages</h2>
      {posts.length === 0 ? (
        <p className="no-posts-message">No added posts</p>
      ) : (
        <div className="posts-list">
          {posts.map((post, index) => (
            <div key={post._id} className="post-item">
              <h3>{post.title}</h3>
              {post.image && <img src={post.image} alt={post.title} className="post-image" />}
              <p>{post.content}</p>
              <div className="post-actions">
                <button 
                  className="delete-button" 
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
                {/* If you reintroduce the edit functionality, you can add the handleEdit function */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyNewMessage;


