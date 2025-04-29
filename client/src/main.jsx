// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RouterProvider from './router/RouterProvider.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider />
  </React.StrictMode>
);
