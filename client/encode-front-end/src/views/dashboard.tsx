// File: client/encode-front-end/src/views/dashboard.tsx
// This file contains dashboard view
// Importing necessary modules 


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart } from '../components/LineChart';
import { PieChart } from '../components/PieChart';
import { DataTable } from '../components/DataTable';
import apiService from '../services/apiService';
import { ISentimentScore, PieChartProps } from '../interfaces/ChartData';

// Defining Dashboard component (TypeScript)
const Dashboard: React.FC = () => {
    const [sentimentScores, setSentimentScores] = useState<ISentimentScore[]>([]);
    const [pieChartData, setPieChartData] = useState<PieChartProps['sentimentLabels']>([]);
    const [detailedSentimentData, setDetailedSentimentData] = useState<ISentimentScore[]>([]);

    useEffect(() => {
        // Example: Fetch recent live streams and perform sentiment analysis
        apiService.getRecentLiveStreams().then((response) => {
            // Assume the response contains live stream data
            const liveStreams = response.data;
            if (liveStreams.length > 0) {
                const streamId = liveStreams[0].id; // Just an example to get the first stream ID
                // Perform sentiment analysis (You need to adjust this part according to your actual data structure)
                apiService.performSentimentAnalysis(streamId, Date.now(), ["message1", "message2"]).then((analysisResponse) => {
                    // Set state with fetched data
                    // This is just a placeholder, will replace it with actual data
                    const sentimentAnalysisResult = analysisResponse.data;
                    setSentimentScores(sentimentAnalysisResult.sentimentScores);
                    setPieChartData(sentimentAnalysisResult.pieChartData);
                    setDetailedSentimentData(sentimentAnalysisResult.detailedSentimentData);
                });
            }
        }).catch((error) => {
            console.error("Failed to fetch live streams or perform sentiment analysis:", error);
        });
    }, []);

    return (
        <div className="flex flex-grow min-h-screen bg-gradient-to-bl from-darkBlue to-trueBlack text-gray-300">
            {/* Content including Navbar, LineChart, PieChart, and DataTable */}
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
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Detailed Sentiment Analysis</h3>
                    {/* <DataTable  /> */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
