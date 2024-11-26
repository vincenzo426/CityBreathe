import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Per la navigazione
import  proPic from "../icons/runner.png"; // Icona per il profilo

const Header = ({ title }) => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate(); // Per navigare al login

  // Funzione per gestire il clic sul profilo
  const handleProfileClick = () => {
    setShowLogout((prev) => !prev); // Mostra o nasconde l'opzione di logout
  };

  // Funzione per gestire il logout
  const handleLogout = () => {
    // Reindirizza l'utente alla pagina di login
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between px-4 py-4 bg-green-500 text-white shadow-lg">
      {/* Titolo centrato */}
      <h1 className="text-xl font-bold text-center flex-1">{title}</h1>

      {/* Riquadro circolare con l'icona del profilo posizionato a destra */}
      <div className="relative">
        <div
          onClick={handleProfileClick}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-md"
        >
          <img src={proPic} alt="Descrizione" className="classe-css" />
        </div>

        {/* Opzione di Logout (mostrata quando clicchi sull'icona del profilo) */}
        {showLogout && (
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white text-gray-700 rounded-lg shadow-md p-2 w-32 text-center cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
