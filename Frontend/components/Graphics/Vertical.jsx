import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const labels = ["Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dog Chow",
      data: labels.map(() => Math.floor(Math.random() * 51)),
      backgroundColor: "rgba(230, 151, 255, 0.5)",
    },
    {
      label: "Prueba",
      data: labels.map(() => Math.floor(Math.random() * 51)),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Prueba 2",
      data: labels.map(() => Math.floor(Math.random() * 51)),
      backgroundColor: "rgba(255, 165, 203, 0.5)",
    },
  ],
};

export function Vertical() {
  return <Bar options={options} data={data} />;
}
