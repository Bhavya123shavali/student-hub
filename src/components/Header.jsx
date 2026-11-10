import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Student Hub</h1>
      <nav className="hidden md:flex space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/profile" className="hover:text-gray-300">Profile</Link>
        <Link to="/settings" className="hover:text-gray-300">Settings</Link>
      </nav>
    </header>
  );
};

export default Header;
