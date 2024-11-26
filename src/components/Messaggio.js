import React from "react";
import runIicon from "../icons/exercise.png";
const Messaggio = ({ valutazione }) => {
  // Mappa dei colori e dei messaggi in base alla valutazione
  const valutazioni = {
    Eccellente: {
      colore: "text-green-500",
      messaggio: "Via libera, è proprio il momento adatto per una bella corsa!",
    },
    Moderata: {
      colore: "text-yellow-500",
      messaggio: "Puoi fare una corsetta ma fai attenzione!",
    },
    "Non sana per gruppi sensibili": {
      colore: "text-orange-500",
      messaggio: "Fai attenzione nella scelta del percorso!",
    },
    Scarsa: {
      colore: "text-red-500",
      messaggio: "L'aria è molto inquinata, ti consiglio aree verdi lontante dal traffico",
    },
    Pericolosa: {
      colore: "text-purple-500",
      messaggio: "Rimanda la corsa a più tardi, danneggeresti la tua salute!",
    },
    // Default per gestire eventuali valori sconosciuti
    default: {
      colore: "text-gray-500",
      messaggio: "Valutazione della qualità dell'aria sconosciuta.",
    },
  };

  // Default message nel caso il tipo non corrisponda
  const { colore, messaggio } = valutazioni[valutazione] || {
    messaggio: "Tipo di messaggio non riconosciuto.",
    colore: "text-gray-500",
  };

  return (
    <div
      className={`flex justify-between items-center w-full px-4 py-3 bg-white shadow-md border 
                p-4 rounded-lg shadow-lg mt-6 ${colore}`}
    >
      {/* Icona */}
      <div className="flex-shrink-0">
        <div >
          {/* Puoi usare una libreria come Heroicons o Font Awesome per le icone */}
          <img
            src={runIicon}
            alt="Descrizione"
            className="h-10 w-10 rounded-full"
          />
        </div>
      </div>

      {/* Messaggio */}
      <div className={`text-sm font-medium ${colore}`}>{messaggio}</div>
    </div>
  );
};

export default Messaggio;
