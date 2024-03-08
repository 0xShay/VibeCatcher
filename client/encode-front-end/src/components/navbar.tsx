// File: client/encode-front-end/src/components/navbar.tsx
// This file contains navbar component
// Importing necessary modules

// Defining Navbar component (TypeScript)
const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">My Sentiment Analysis Dashboard</div>
          <div>
            <a href="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">Dashboard</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

