import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Id = () => {
  const [post, setPost] = useState(null);
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    const urlParts = window.location.pathname.split('/');
    const idFromURL = urlParts[urlParts.length - 1];
    setPostId(idFromURL);
  }, []);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${postId}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) return <p>Loading...</p>;

  return (
    <motion.div 
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
      <p className="mt-4 text-gray-600">{post.body}</p>
    </motion.div>
  );
};

export default Id;
