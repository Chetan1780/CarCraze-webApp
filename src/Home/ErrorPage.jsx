// src/ErrorPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
