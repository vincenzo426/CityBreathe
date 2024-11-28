export const getDataCorse = (corse) => ({
    labels: corse.map((corsa, index) => `Corsa ${index + 1}`),
    datasets: [
      {
        label: "Velocità (km/h)",
        data: corse.map((corsa) => parseFloat(corsa.speed)),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointRadius: 5,
      },
    ],
  });
  
  export const getDataAndamento = (ultimaCorsa) => ({
    labels: ultimaCorsa.speedOverTime.map((item) => item.time),
    datasets: [
      {
        label: "Velocità (km/h)",
        data: ultimaCorsa.speedOverTime.map((item) => parseFloat(item.speed)),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        pointRadius: 5,
      },
    ],
  });
  
  export const optionsCorse = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const corsa = context.raw; // Usa i dati direttamente
            return `Velocità: ${corsa} km/h`;
          },
        },
      },
    },
    scales: {
      x: { title: { display: true, text: "Distanza (km)" } },
      y: { title: { display: true, text: "Velocità (km/h)" } },
    },
  };
  
  export const optionsAndamento = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: "Tempo (min)" } },
      y: { title: { display: true, text: "Velocità (km/h)" } },
    },
  };
  