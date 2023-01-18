import React from "react";
// Chart Component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
//Material Ui
import { Box } from "@mui/material";
// ----------------------------------------------------------------------
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
);

export const options = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },

    y: {
      grid: {
        display: false,
        // color: "white",
      },
    },
  },
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
  },
};

export default function BarChart({ xLabels, family,health,unknown }) {
  const data = {
    labels: xLabels,
    datasets: [
      {
        label: "HEALTH",
        backgroundColor: "pink",
        borderColor: "red",
        borderWidth: 1,
        data: health,
      },
      {
        label: "FAMILY",
        backgroundColor: "lightblue",
        borderColor: "blue",
        borderWidth: 1,
        data: family,
      },
      {
        label: "UNKNOWN",
        backgroundColor: "lightgreen",
        borderColor: "green",
        borderWidth: 1,
        data: unknown,
      },
    ],
  };

  return (
    <Box style={{ width: "100%", height: "100%" }}>
      <Bar options={options} data={data} />
    </Box>
  );
}
