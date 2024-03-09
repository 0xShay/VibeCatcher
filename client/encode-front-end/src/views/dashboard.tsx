// File: client/encode-front-end/src/views/dashboard.tsx
// This file contains dashboard view
// Importing necessary modules 
import React from 'react'
import { LineChart } from '../components/LineChart';
import { ISentimentScore } from '../interfaces/ChartData';
import { PieChartProps } from '../interfaces/ChartData';
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
    
    return (
        <div className="flex flex-grow min-h-screen bg-gradient-to-bl from-darkBlue to-trueBlack text-gray-300">
            {/* Dashboard-specific Vertical Navbar */}
            <div className="w-40 lg:w-64 bg-gray-700 text-white py-4">
                <h2 className="text-lg font-semibold px-4 mb-4">Dashboard</h2>
                <ul className="flex flex-col space-y-2">
                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Analytics Overview</li>
                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Sentiment Analysis</li>
                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Entity Analysis</li>
                    {/* Mock navbar buttons */}
                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Settings</li>
                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Profile</li>
                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Logout</li>
                </ul>
            </div>

            {/* Main Content Area of Dashboard */}
            <div className="flex-grow p-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Sentiment Score Over Time */}
                    <div className="bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="font-semibold">Sentiment Score Over Time</h3>
                        <LineChart sentimentData={sentimentScores} />
                    </div>
                    {/* Sentiment Label Distribution */}
                    <div className="bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="font-semibold">Sentiment Labels</h3>
                        <PieChart sentimentLabels={pieChartData} />
                    </div>
                </div>
                {/* Table for additional data visualization at the bottom */}
                <div className="bg-gray-800 mt-4 p-4 rounded-lg shadow">
                    <h3 className="font-semibold">Detailed Sentiment Analysis</h3>
                    {/* Placeholder for table */}
                    <div className="h-64">Table Placeholder</div>
                </div>
            </div>
        </div>
    );
};

// Exporting Dashboard component
export default Dashboard;
