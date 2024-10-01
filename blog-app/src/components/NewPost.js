// import React, { useState } from 'react';
// import './NewPost.css';

// const NewPost = ({ addPost }) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState(null);
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!title || !content) {
//       setError('Both title and content are required.');
//       return;
//     }

//     // Reset error message
//     setError('');

//     // Create new post object
//     const newPost = {
//       title,
//       content,
//       image: image ? URL.createObjectURL(image) : null,
//     };

//     // Add post and show alert
//     addPost(newPost);
//     alert('Post added successfully!');

//     // Clear form fields
//     setTitle('');
//     setContent('');
//     setImage(null);
//   };

//   return (
//     <div className="newpost-container">
//       <div className="form-box">
//         <h2>Create New Post</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Post Title"
//           />
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="Post Content"
//           ></textarea>
//           <input
//             type="file"
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//           <button type="submit">Add Post</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NewPost;


import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const NewPost = ({ addPost }) => {
  const [error, setError] = useState('');

  // Validation schema
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    image: Yup.mixed().required('An image is required')
  });

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('image', values.image);

    try {
      const response = await axios.post('https://blogapp-dwnf.vercel.app/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      addPost(response.data.post); // Add the post to frontend state
      alert('Post added successfully!');
      resetForm(); // Reset the form fields
    } catch (err) {
      console.error('Error adding post:', err);
      setError('Failed to add post');
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      {error && <p>{error}</p>}
      <Formik
        initialValues={{ title: '', content: '', image: null }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <label htmlFor="title">Title</label>
              <Field type="text" name="title" />
              <ErrorMessage name="title" component="div" />
            </div>

            <div>
              <label htmlFor="content">Content</label>
              <Field as="textarea" name="content" />
              <ErrorMessage name="content" component="div" />
            </div>

            <div>
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
              />
              <ErrorMessage name="image" component="div" />
            </div>

            <button type="submit">Add Post</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewPost;
