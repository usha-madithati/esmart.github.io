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

  // Extract dates
  const productDates = validProducts.map(product => new Date(product.addedDate));

  // Aggregate products added per day
  const productsAddedPerDay = productDates.reduce((acc, date) => {
    const day = date.toISOString().split('T')[0];
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  // Prepare chart data
  const labels = Object.keys(productsAddedPerDay).sort();
  const data = labels.map(label => productsAddedPerDay[label]);

  // Debugging: Log chart data
  console.log('Chart Data:', { labels, data });

  // Default chartData if no data is present
  const chartData = {
    labels: labels.length > 0 ? labels : ['No Data'],
    datasets: [
      {
        label: 'Products Added',
        data: data.length > 0 ? data : [1],
        borderColor: 'blue',
        backgroundColor: 'rgba(0,0,255,0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Products Added: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Products',
        },
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
