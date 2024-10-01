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

const MyNewMessage = () => {
  const [posts, setPosts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editPostData, setEditPostData] = useState(null);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://blogapp-dwnf.vercel.app/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    setEditPostData(post);
    setEditMode(true);
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`https://blogapp-dwnf.vercel.app/api/posts/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdate = async (updatedPost) => {
    try {
      const response = await axios.put(`https://blogapp-dwnf.vercel.app/api/posts/${updatedPost._id}`, updatedPost);
      setPosts(posts.map(post => post._id === updatedPost._id ? response.data : post));
      setEditMode(false);
      setEditPostData(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <h2>My New Messages</h2>
      {editMode ? (
        <div>
          <h3>Edit Post</h3>
          {/* Add a form to edit the post */}
        </div>
      ) : (
        <div>
          {posts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            posts.map(post => (
              <div key={post._id}>
                <h3>{post.title}</h3>
                {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
                <p>{post.content}</p>
                <button onClick={() => handleEdit(post)}>Edit</button>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyNewMessage;
