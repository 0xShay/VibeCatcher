import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface ChartComponentProps {
  data: number[];
  labels: string[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data, labels }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);
  
    useEffect(() => {
      const createChart = () => {
        if (chartRef.current) {
          const ctx = chartRef.current.getContext('2d');
          if (ctx) {
            chartInstanceRef.current = new Chart(ctx, {
              type: 'line',
              data: {
                labels: labels,
                datasets: [{
                  label: 'Data',
                  data: data,
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });
          }
        }
      };
  
      if (chartInstanceRef.current) {
        // Destroy the previous chart instance before creating a new one
        chartInstanceRef.current.destroy();
      }
      createChart();
  
      // Cleanup function to destroy chart instance when component unmounts
      return () => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
      };
    }, [data, labels]); // Re-create the chart if data or labels change
  
    return <canvas ref={chartRef} />;
  };
  
  export default ChartComponent;