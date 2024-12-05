import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Visualization({ predictions }) {
  if (predictions.length === 0) {
    return <p>No data to display. Train the model first.</p>;
  }

  const data = {
    labels: predictions.map((p) => p.courseCode),
    datasets: [
      {
        label: "Predicted Enrollment",
        data: predictions.map((p) => p.predictedEnrollment),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Predicted Enrollments" },
    },
  };

  return (
    <div>
      <h3>Enrollment Visualization</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Visualization;
