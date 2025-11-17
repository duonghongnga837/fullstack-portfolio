import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto p-8 text-center">
      <div className="bg-white rounded-lg shadow-xl p-12 max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          I'm a passionate web developer specializing in creating modern, responsive, and user-friendly web applications with React and Tailwind CSS.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            to="/projects" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
          >
            View My Projects
          </Link>
          <Link 
            to="/contact" 
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-700 transition-colors duration-300 shadow-md"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;