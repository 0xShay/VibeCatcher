// File: client/encode-front-end/src/components/navbar.tsx
// This file contains navbar component
// Importing necessary modules

import React from "react";
import { useAuth } from "../context/AuthContext";
// Defining Navbar component (TypeScript)
const Navbar: React.FC = () => {

    const { isAuthenticated, login, logout } = useAuth();

  return (
    <nav className="bg-gray-900 py-4 w-full">
      <div className="container mx-auto flex justify-between items-center font-[satoshi]">
        <a href="#" className="text-xl text-white font-bold pl-10">
          VibeCatcher
        </a>
        <div className="flex w-1/5 justify-between items-start font-bold pl-20">
          <a href="#" className="text-white hover:text-gray-400">
            Home
          </a>
          <a href="#about" className="text-white hover:text-gray-400">
            About
          </a>
          <a href="#contact" className="text-white hover:text-gray-400">
            Contact
          </a>
        </div>
        <div className="flex w-1/5 justify-center items-start font-bold">
        

        <button onClick={isAuthenticated ? logout : login} className="text-white hover:text-gray-400 pr-10">
            {isAuthenticated ? 'Logout' : 'Login'}
        </button>

          <button className="text-white">
            Get notified
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

