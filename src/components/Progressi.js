import React, { useContext } from "react";
import { CorsaContext } from "./CorsaContext";
import Header from "./Header";
import MenuFooter from "./MenuFooter";
import { Line } from "react-chartjs-2";
import runningMap from "../icons/running.png";
import {
  getDataCorse,
  getDataAndamento,
  optionsCorse,
  optionsAndamento,
} from "../utils/chartUtils";
import "chart.js/auto";

const Progressi = () => {
  const { corse } = useContext(CorsaContext);
  const ultimaCorsa = corse[corse.length - 1];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Progressi" />
      <div className="p-6">
        {/* Sezione Ultima Corsa */}
        {ultimaCorsa ? (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-lg mx-auto flex items-center justify-between gap-x-10">
            <div className="flex-2">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Ultima Corsa
              </h2>
              <div className="grid grid-cols-1">
                <p className="text-gray-600 font-medium">
                  Tempo:{" "}
                  <span className="text-black">{ultimaCorsa.time}</span>
                </p>
                <p className="text-gray-600 font-medium">
                  Distanza:{" "}
                  <span className="text-black">{ultimaCorsa.distance}</span>
                </p>
                <p className="text-gray-600 font-medium">
                  Velocità:{" "}
                  <span className="text-black">{ultimaCorsa.speed}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full ml-6">
              <img
                src={runningMap}
                alt="Descrizione"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Nessuna corsa effettuata.</p>
        )}

        {/* Grafico andamento velocità dell'ultima corsa */}
        {ultimaCorsa?.speedOverTime && (
          <div className="p-4 bg-white shadow-md rounded mb-6">
            <h2 className="text-lg font-semibold mb-4">
              Andamento Velocità (Ultima Corsa)
            </h2>
            <Line
              data={getDataAndamento(ultimaCorsa)}
              options={optionsAndamento}
            />
          </div>
        )}

        {/* Grafico complessivo delle corse */}
        {corse.length > 0 && (
          <div className="p-4 bg-white shadow-md rounded">
            <h2 className="text-lg font-semibold mb-4">Grafico delle Corse</h2>
            <Line data={getDataCorse(corse)} options={optionsCorse} />
          </div>
        )}

        <MenuFooter />
      </div>
    </div>
  );
};

export default Progressi;
