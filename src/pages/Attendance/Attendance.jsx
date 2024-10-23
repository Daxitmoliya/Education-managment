import React from "react";
import { Bar } from "react-chartjs-2"; // Import Bar chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

function Attendance() {
  // Sample data for attendance
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"], // X-axis labels
    datasets: [
      {
        label: "Attendance",
        data: [30, 45, 35, 50], // Sample attendance data
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Attendance Records',
      },
    },
  };

  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
      <header className="ie-na-header flex w-full justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Attendance</h3>
      </header>
      <div className="ie-na-content mt-5 flex w-full flex-col gap-10 2xl:flex-row">
        <div className="w-full">
          <Bar data={data} options={options} /> {/* Render the Bar chart */}
        </div>
        <p>This page will contain attendance records.</p>
      </div>
    </div>
  );
}

export default Attendance;
