import React, { useEffect, useState } from 'react';

const New = ({ onSuccess, initialData = null }) => {
  const [form, setForm] = useState({ title: '', body: '', author: '' });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = initialData ? 'PUT' : 'POST';
      const url = initialData
        ? `http://localhost:5000/api/posts/${initialData._id}`
        : 'http://localhost:5000/api/posts/addpost';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const resultPost = await res.json();
        onSuccess(resultPost);
      } else {
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {initialData ? 'Edit Post' : 'New Post'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="w-full p-2 border"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="body"
          placeholder="Body"
          className="w-full p-2 border"
          value={form.body}
          onChange={handleChange}
          required
        />
        <input
          name="author"
          placeholder="Author"
          className="w-full p-2 border"
          value={form.author}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {initialData ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default New;
