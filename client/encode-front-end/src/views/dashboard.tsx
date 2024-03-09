// File: client/encode-front-end/src/views/dashboard.tsx
// This file contains dashboard view
// Importing necessary modules 
import React from 'react'
import { Bar } from 'react-chartjs-2';

// Defining Dashboard component (TypeScript)
const Dashboard: React.FC = () => {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Sample Dataset',
          backgroundColor: 'rgba(99, 132, 255, 0.2)',
          borderColor: 'rgba(99, 132, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(99, 132, 255, 0.4)',
          hoverBorderColor: 'rgba(99, 132, 255, 1)',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    };
  
    return (
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5">Analytics Dashboard</h1>
        <div className="shadow-lg rounded-lg overflow-hidden">
            {/* Data from backend */}
          <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    );
  };

export default Dashboard

// Exporting Dashboard component

