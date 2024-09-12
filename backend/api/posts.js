import dbConnect from '../../utils/dbConnect';
import Post from '../../models/Post';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const posts = await Post.find({});
    return res.status(200).json(posts);
  }

  if (req.method === 'POST') {
    const { title, content } = req.body;
    const newPost = new Post({ title, content });
    await newPost.save();
    return res.status(201).json(newPost);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    await Post.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Post deleted' });
  }

  res.status(400).json({ message: 'Invalid method' });
}
