import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

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
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
    y2: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ["Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export const data = {
  labels,
  datasets: [
    {
      label: "Galletas",
      data: labels.map(() => Math.floor(Math.random() * 101)),
      backgroundColor: "rgba(230, 151, 255, 0.5)",
      borderColor: "rgba(230, 151, 255, 0.5)",
      yAxisID: "y",
    },
    {
      label: "Pelotas",
      data: labels.map(() => Math.floor(Math.random() * 101)),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      borderColor: "rgba(53, 162, 235, 0.5)",
      yAxisID: "y1",
    },
    {
      label: "Huesos",
      data: labels.map(() => Math.floor(Math.random() * 101)),
      backgroundColor: "rgba(131, 187, 38, 0.5)",
      borderColor: "rgba(131, 187, 38, 0.5)",
      yAxisID: "y2",
    },
  ],
};

export function MultiAxis() {
  return <Line options={options} data={data} />;
}
