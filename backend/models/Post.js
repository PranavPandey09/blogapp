const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or file path for the image
  },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
