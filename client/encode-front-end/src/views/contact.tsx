// File: client/encode-front-end/src/views/contact.tsx
// This file contains contact view
// Importing necessary modules

// Defining Contact component (TypeScript)
const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
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
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-center text-gray-800">Contact Us</h1>
        <p className="mt-4 text-center text-gray-600">For any queries, please reach out to us at <a href="mailto:" className="text-blue-500">
            <span className="underline">

            </span>
            </a></p>
        </div>
    </div>
    );
}

export default Contact;