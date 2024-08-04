import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <h1 className="text-9xl font-bold">404</h1>
      <h2 className="text-4xl font-medium mb-4">Page Not Found</h2>
      <p className="mb-8">The page you're looking for doesn't exist.</p>
      <a href="/" className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-200">
        Go Back Home
      </a>
    </div>
  );
}

export default NotFoundPage;
