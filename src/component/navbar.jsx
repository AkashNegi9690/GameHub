import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">{props.site}</h1>
        <div    >
          <Link to="/" className="text-white hover:text-yellow-400 transition-colors duration-300">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
