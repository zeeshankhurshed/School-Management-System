import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-extrabold text-red-600">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-gray-700 italic">Page Not Found</h2>
      <p className="mt-2 text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
      <a 
        href="/" 
        className="mt-5 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
