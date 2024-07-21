// DashboardOverview.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const DashboardOverview = ({ products }) => {
  // Extract and validate product dates
  const validProducts = products.filter(product => {
    const date = new Date(product.addedDate);
    return !isNaN(date);
  });

  const productDates = validProducts.map(product => new Date(product.addedDate));

  // Aggregate products added per day
  const productsAddedPerDay = productDates.reduce((acc, date) => {
    const day = date.toISOString().split('T')[0];
    if (!acc[day]) {
      acc[day] = 1;
    } else {
      acc[day]++;
    }
    return acc;
  }, {});

  const labels = Object.keys(productsAddedPerDay).sort();
  const data = labels.map(label => productsAddedPerDay[label]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Products Added',
        data: data,
        borderColor: 'blue',
        backgroundColor: 'rgba(0,0,255,0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div className="cards">
        <div className="card">
          <div className="card-content">
            <h3>{products.length}</h3>
            <p>Total Products</p>
          </div>
        </div>
        {/* Add more cards if needed */}
      </div>
      <div className="charts">
        <Line data={chartData} options={options} />
        {/* Add other charts here */}
      </div>
    </div>
  );
};

export default DashboardOverview;
