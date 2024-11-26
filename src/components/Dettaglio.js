import React, { useState } from "react";

const Dettaglio = ({ pollutants, explanations }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPollutant, setSelectedPollutant] = useState(null);

  const toggleDetails = () => {
    setIsOpen((prev) => !prev);
  };

  const handlePollutantClick = (pollutant) => {
    setSelectedPollutant(pollutant);
  };

  const closeModal = () => {
    setSelectedPollutant(null);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg mt-6">
      {/* Titolo con pulsante + */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-black">
          Dettaglio degli Inquinanti
        </h3>
        <button
          onClick={toggleDetails}
          className="text-black bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-all"
          aria-label={isOpen ? "Nascondi dettagli" : "Mostra dettagli"}
        >
          <span
            className={`text-xl transform transition-transform ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
          >
            +
          </span>
        </button>
      </div>

      {/* Dettagli agenti inquinanti */}
      <div
        className={`transition-all overflow-hidden duration-300 ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <h2 className="text-sm text-black">Tocca per saperne di più</h2>
        <ul className="space-y-2 mt-4">
          {Object.entries(pollutants).map(([key, value], index) => (
            <React.Fragment key={key}>
              <li
                className="flex justify-between cursor-pointer hover:bg-gray-200 p-2 rounded"
                onClick={() => handlePollutantClick(key)}
              >
                <span className="text-black">{key}:</span>
                <span className="text-black font-semibold">{value} μg/m³</span>
              </li>
              {/* Divider */}
              {index < Object.entries(pollutants).length - 1 && (
                <hr className="border-t border-gray-600" />
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>

      {/* Modale */}
      {selectedPollutant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              Dettagli su {selectedPollutant}
            </h2>
            <p className="text-gray-700 mb-6">
              {explanations[selectedPollutant]}
            </p>
            <button
              onClick={closeModal}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dettaglio;
