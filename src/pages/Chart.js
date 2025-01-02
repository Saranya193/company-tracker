import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  
  // Register the required components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  