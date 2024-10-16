import React from 'react';
import { Link } from 'react-router-dom';
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-gray-700">
          <div className="mb-4 flex flex-col items-center">
            <h4 className="text-lg font-semibold">CarCraze</h4>
            <p className="text-sm">Buy and sell new and used cars</p>
          </div>
          <div className="flex space-x-4 mb-4">
            <Link to="/about" className="text-gray-600 hover:text-teal-600">About Us</Link>
            <Link to="/contact" className="text-gray-600 hover:text-teal-600">Contact</Link>
            <Link to="/privacy" className="text-gray-600 hover:text-teal-600">Privacy Policy</Link>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} CarCraze. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
