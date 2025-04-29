// client/src/RouterProvider.jsx
import React, { useEffect, useState } from 'react';
import Index from '../pages/Index.jsx';
import Id from '../pages/posts/Id.jsx';
import New from '../pages/posts/New.jsx'; // ✅ Import the New component

const RouterProvider = () => {
  const [Component, setComponent] = useState(() => Index);

  const matchRoute = (pathname) => {
    if (pathname === '/' || pathname === '/posts') return Index;
    if (pathname === '/new') return New; // ✅ Add this line
    if (/^\/posts\/[\w\d]+$/.test(pathname)) return Id;
    return () => <div className="p-4">404 - Page Not Found</div>;
  };

  const handleRouteChange = () => {
    const path = window.location.pathname;
    setComponent(() => matchRoute(path));
  };

  useEffect(() => {
    window.addEventListener('popstate', handleRouteChange);
    handleRouteChange(); // initial route

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return <Component />;
};

export default RouterProvider;
