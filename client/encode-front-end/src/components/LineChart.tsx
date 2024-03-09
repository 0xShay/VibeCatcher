// File: client/encode-front-end/src/components/LineChart.tsx
// This file contains LineChart component

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ISentimentScore } from '../interfaces/ChartData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
    sentimentData: ISentimentScore[];
  }
  
  export const LineChart: React.FC<LineChartProps> = ({ sentimentData }) => {
    // Transforming ISentimentScore[] into the structure needed by Chart.js
    const data = {
      labels: sentimentData.map((dataPoint) => dataPoint.timestamp),
      datasets: [
        {
            label: 'Sentiment Score',
            data: sentimentData.map((dataPoint) => dataPoint.score),
            borderColor: 'rgb(75, 192, 192)', // Example color
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
    ],
    
    };

    const options = {
        scales: {
          y: {
            ticks: {
              color: "#ffffff",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
          x: {
            ticks: {
              color: "#ffffff",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "#ffffff",
            },
          },
          tooltip: {
            // Custom tooltip styling if needed
          },
        },
      };
  
    return <Line data={data} options={options} />;
  };
