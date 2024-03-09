// File: client/encode-front-end/src/components/PieChart.tsx
// This file contains PieChart component

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Tooltip, Legend, ArcElement);

interface PieChartProps {
  sentimentLabels: { label: string; count: number }[];
}

export const PieChart: React.FC<PieChartProps> = ({ sentimentLabels }) => {
  const data = {
    labels: sentimentLabels.map(item => item.label),
    datasets: [
      {
        data: sentimentLabels.map(item => item.count),
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)', // Example color for Neutral
          'rgba(75, 192, 192, 0.5)', // Example color for Positive
          'rgba(255, 99, 132, 0.5)', // Example color for Negative
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#ffffff", // Ensures legend text is visible on dark backgrounds
        },
      },
      tooltip: {
        callbacks: {
          // Custom tooltip styling or callbacks as needed
        },
        bodyColor: "#ffffff", // Ensures tooltip text color is visible on dark backgrounds
        titleColor: "#ffffff",
        backgroundColor: "rgba(50, 50, 50, 0.8)", // Darker background for tooltips
      },
    },
  };

  return <Pie data={data} options={options} />;
};
