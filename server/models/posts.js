import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Post', postSchema);
