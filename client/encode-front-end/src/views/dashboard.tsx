// File: client/encode-front-end/src/views/dashboard.tsx
// This file contains dashboard view
// Importing necessary modules 
import React from 'react'
import { LineChart } from '../components/LineChart';
import { ISentimentScore } from '../interfaces/ChartData';

// Defining Dashboard component (TypeScript)
const Dashboard: React.FC = () => {
    // Simulated dynamic data
    const sentimentScores: ISentimentScore[] = [
        { timestamp: 'January', score: 0.3 },
        { timestamp: 'February', score: 0.6 },
        { timestamp: 'March', score: 0.4 },
        { timestamp: 'April', score: 0.5 },
        { timestamp: 'May', score: 0.7 },
        { timestamp: 'June', score: 0.2 },
        { timestamp: 'July', score: 0.8 },
    ];
    
    return (
        <div className="flex flex-grow min-h-screen">
            {/* Dashboard-specific Vertical Navbar */}
            <div className="w-40 lg:w-64 bg-gray-700 text-white py-4">
                <h2 className="text-lg font-semibold px-4 mb-4">Dashboard</h2>
                <ul className="flex flex-col space-y-2">
                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Analytics Overview</li>
                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Sentiment Analysis</li>
                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Entity Analysis</li>
                    {/* Add other dashboard-specific navigation items */}
                </ul>
            </div>

            {/* Main Content Area of Dashboard */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold">Sentiment Over Time</h3>
                    <LineChart sentimentData={sentimentScores} />
                </div>
                {/* Other sections or visualizations can follow here */}
            </div>
        </div>
    );
};

export default Dashboard;

// Exporting Dashboard component

