// File: client/encode-front-end/src/views/dashboard.tsx
// This file contains dashboard view
// Importing necessary modules 
import React from 'react'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom at the top
import { LineChart } from '../components/LineChart';
import { ISentimentScore } from '../interfaces/ChartData';
import { PieChartProps } from '../interfaces/ChartData';
import { DataTable } from '../components/DataTable';
import { PieChart } from '../components/PieChart';


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
    const sentimentLabels: { timestamp: string; label: string; }[] = [
        { timestamp: 'January', label: 'Neutral' },
        { timestamp: 'February', label: 'Positive' },
        { timestamp: 'March', label: 'Negative' },
        // Continue as needed
    ];
    // Transform sentimentLabels into a format suitable for the PieChart
    const sentimentLabelCounts = sentimentLabels.reduce((acc, { label }) => {
        acc[label] = (acc[label] || 0) + 1;
        return acc;
    }, {} as { [key: string]: number });

    const pieChartData = Object.keys(sentimentLabelCounts).map(label => ({
        label,
        count: sentimentLabelCounts[label],
    }));

    // Example detailed sentiment analysis data
    const detailedSentimentData = [
        { timestamp: '2021-01-01', score: 0.8, label: 'Positive' },
        // Add more data as needed
    ];

    
    return (
        <div className="flex flex-grow min-h-screen bg-gradient-to-bl from-darkBlue to-trueBlack text-gray-300">
            {/* Mock navbar */}
            <div className="w-40 lg:w-64 bg-gray-700 text-white py-4">
                <h2 className="text-lg font-semibold px-4 mb-4">Dashboard</h2>
                <ul className="flex flex-col space-y-2">
                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Analytics Overview</li>
                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Sentiment Analysis</li>
                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Entity Analysis</li>
                    {/* Additional mock navbar buttons */}
                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                    <Link to="/payments">Buy Credits</Link> {/* Add this line */}
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Settings</li>
                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Profile</li>
                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Logout</li>
                </ul>
            </div>

            <div className="flex-grow p-5 space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Sentiment Score Over Time</h3>
                        <LineChart sentimentData={sentimentScores} />
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Sentiment Labels</h3>
                        <PieChart sentimentLabels={pieChartData} />
                    </div>
                </div>
               {/* Detailed Sentiment Analysis Table */}
               <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Detailed Sentiment Analysis</h3>
                <DataTable data={detailedSentimentData} />
            </div>
            </div>
        </div>
    );
};

// Exporting Dashboard component
export default Dashboard;
