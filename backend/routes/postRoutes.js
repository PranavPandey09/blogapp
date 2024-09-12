const express = require('express');
const {
  getPosts,
  createPost,
  deletePost,
  updatePost,
} = require('../controllers/postController');

const router = express.Router();

// GET all posts
router.get('/', getPosts);

// POST a new post
router.post('/', createPost);

// DELETE a post by ID
router.delete('/:id', deletePost);

// PUT update a post by ID
router.put('/:id', updatePost);

module.exports = router;
