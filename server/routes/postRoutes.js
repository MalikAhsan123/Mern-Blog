import express from 'express';
import Post from '../models/posts.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.post('/addpost', async (req, res) => {
    try {
      const newPost = new Post(req.body);
      const saved = await newPost.save();
      res.status(201).json(saved);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
      res.status(200).json({ message: 'Post deleted', id: deletedPost._id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

export default router;
