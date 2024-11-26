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

// Registrazione dei componenti di Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Grafico = ({ hourlyData }) => {
  // Etichette per le ore (0-23)
  const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  // Configurazione dei dati per il grafico
  const data = {
    labels,
    datasets: [
      {
        label: "Qualità dell'aria (AQI)",
        data: hourlyData,
        backgroundColor: hourlyData.map((value) => {
          if (value <= 50) return "rgba(34, 197, 94, 0.7)"; // Verde
          if (value <= 100) return "rgba(234, 179, 8, 0.7)"; // Giallo
          if (value <= 150) return "rgba(249, 115, 22, 0.7)"; // Arancione
          if (value <= 200) return "rgba(239, 68, 68, 0.7)"; // Rosso
          if (value <= 300) return "rgba(168, 85, 247, 0.7)"; // Viola
          return "rgba(75, 85, 99, 0.7)"; // Grigio
        }),
        borderRadius: 8, // Aggiunge bordi arrotondati alle barre
      },
    ],
  };

  // Opzioni del grafico
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permette una migliore gestione della dimensione
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `AQI: ${context.raw}`,
        },
      },
      title: {
        display: true,
        text: "Previsioni AQI per le prossime 24 ore",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Ore",
        },
        ticks: {
          autoSkip: true, // Riduce il numero di etichette sull'asse X
          maxTicksLimit: 8, // Mostra un massimo di 8 etichette
        },
      },
      y: {
        title: {
          display: true,
          text: "Indice di Qualità dell'Aria (AQI)",
        },
        beginAtZero: true,
        max: 400, // Asse Y limitato a 300
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg mt-6">
      <h3 className="text-lg font-bold text-black mb-4">Previsioni AQI</h3>
      <div style={{ height: "200px", width: "100%" }}> {/* Altezza adattabile */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Grafico;
