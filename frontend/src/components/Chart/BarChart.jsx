import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ orders }) => {
  // Extract order IDs and total prices
  const orderIds = orders.map((order) => order._id);
  const totalPrices = orders.map((order) => order.totalPrice);

  // Data for the bar chart
  const data = {
    labels: orderIds,
    datasets: [
      {
        label: "Total Price",
        data: totalPrices,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Options for the bar chart
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="mt-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
