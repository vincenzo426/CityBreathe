import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Card = ({ citta, valoreAQI, valutazione }) => {
  // Mappa colori AQI
  const AQI_COLORS = [
    { threshold: 50, color: "#22c55e" }, // Verde
    { threshold: 100, color: "#eab308" }, // Giallo
    { threshold: 150, color: "#f97316" }, // Arancione
    { threshold: 200, color: "#ef4444" }, // Rosso
    { threshold: 300, color: "#a855f7" }, // Viola
  ];

  // Funzione per ottenere il colore in base al valore AQI
  const getAQIColor = (value) => {
    for (let i = 0; i < AQI_COLORS.length; i++) {
      if (value <= AQI_COLORS[i].threshold) {
        return AQI_COLORS[i].color;
      }
    }
    return AQI_COLORS[AQI_COLORS.length - 1].color; // Colore per valori > 300
  };

  // Ottenere l'orario corrente formattato
  const getFormattedTime = () => {
    const now = new Date();
    return `${now.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "short",
    })} ${now.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };
  // Colore basato sul valore AQI
  const valutazioneColor = getAQIColor(valoreAQI);
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-lg mx-auto">
      {/* Sezione di testo */}
      <div>
        <h1 className="text-xl font-bold text-black">Rilevazione AQI</h1>
        <h2 className="text-xl font-semibold text-blue">{citta}</h2>
        <h3
          className="text-lg font-semibold"
          style={{ color: valutazioneColor }} // Colore dinamico per la valutazione
        >
          {valutazione}
        </h3>
        <p className="text-sm text-gray-600">
          {getFormattedTime()}, ora locale
        </p>
        <div className="flex items-center mt-2"></div>
      </div>

      {/* Gradient Circle Chart */}
      <div className="w-16 h-16">
        <CircularProgressbar
          value={valoreAQI}
          maxValue={300}
          text={`${valoreAQI} AQI`}
          styles={buildStyles({
            textColor: "#000", // Colore del testo
            pathColor: getAQIColor(valoreAQI), // Colore mappato ai valori AQI
            trailColor: "lightgray", // Colore dello sfondo del cerchio
            textSize: "1.2rem",
          })}
        />
      </div>
    </div>
  );
};

export default Card;
