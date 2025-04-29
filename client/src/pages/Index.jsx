import React, { useEffect, useState } from 'react';
import New from './posts/New.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editPost, setEditPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/posts');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleClick = (id) => {
    history.pushState({}, '', `/posts/${id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setPosts(prev => prev.filter(post => post._id !== id));
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (post) => {
    setEditPost(post);
    setShowModal(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 Blog Posts</h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => {
            setEditPost(null);
            setShowModal(true);
          }}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + New Post
        </button>
      </div>

      <div className="space-y-4">
  {posts.length === 0 ? (
    <p className="text-center text-gray-500">No posts found.</p>
  ) : (
    <AnimatePresence>
      {posts.map(post => (
        post && post.title ? (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="p-4 border rounded shadow hover:bg-gray-50 transition"
          >
            <h2
              onClick={() => handleClick(post._id)}
              className="text-xl font-semibold cursor-pointer hover:underline"
            >
              {post.title}
            </h2>
            <p className="text-gray-600 mt-1">{post.body?.slice(0, 100)}...</p>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => handleEdit(post)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ) : null
      ))}
    </AnimatePresence>
  )}
</div>


      {/* ✅ Modal for Creating or Editing Post */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>
            <New
  initialData={editPost}
  onSuccess={(updatedOrNewPost) => {
    setShowModal(false);
    setEditPost(null);

    if (editPost) {
      setPosts(prev =>
        prev.map(post => (post._id === updatedOrNewPost._id ? updatedOrNewPost : post))
      );
    } else {
      setPosts(prev => [updatedOrNewPost, ...prev]);
    }
  }}
/>

          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Index;
