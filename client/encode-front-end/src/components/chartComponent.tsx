import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Stream analytics',
    },
  },
};

const labels = ['00:00:00','01:00:00','02:00:00', '03:00:00', '04:00:00', '05:00:00', '06:00:00'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Stream: 09/03/2024',
      data: labels.map(() => faker.datatype.number({ min: -1, max: 1 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      cubicInterpolationMode: 'monotone' as const
    },
    {
      label: 'Stream: 10/03/2024',
      data: labels.map(() => faker.datatype.number({ min: -1, max: 1 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      cubicInterpolationMode: 'monotone' as const
    },
  ],
};
const chartComponent = () => {
    return <div style={{ width: '700px', height: '500px' }}>
    <Line data={data} options={options} />
  </div>
}
  
export default chartComponent;