const Post = require('../models/Post');

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
    const { title, content, image } = req.body;
  
    // Validation
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
  
    const newPost = new Post({
      title,
      content,
      image,
    });
  
    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
// Delete a post
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, { title, content, image }, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
