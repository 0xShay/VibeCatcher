// File: client/encode-front-end/src/components/navbar.tsx
// This file contains navbar component
// Importing necessary modules
import React, { useState } from 'react';


// Defining Navbar component (TypeScript)
const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    return (

        
        <nav className="sticky top-0 z-50 flex w-full justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10">
      <div className="container mx-auto flex w-full items-center justify-between px-3">
        {/* Hamburger Menu Button */}
        <button className="block lg:hidden border-0 bg-transparent p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-200" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-expanded={isMenuOpen} aria-label="Toggle navigation">
          {/* Hamburger Icon */}
          <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`${isMenuOpen ? "flex" : "hidden"} flex-grow lg:flex items-center lg:basis-auto`}>

          <ul className="flex flex-col lg:flex-row lg:space-x-8 me-auto">
            <li><a href="#" className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">Home</a></li>
            <li><a href="#" className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">About</a></li>
            <li><a href="#" className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">Services</a></li>
          </ul>
        </div>
      </div>
    </nav>
    
  );
};
  
  export default Navbar;
