const fileMatcher = (path) => {
  if (path === '/') return 'Index.jsx';
  if (path === '/posts/new') return 'posts/New.jsx';
  if (/^\/posts\/[^/]+$/.test(path)) return 'posts/Id.jsx';
  return 'Index.jsx'; // fallback
};

export default fileMatcher;
