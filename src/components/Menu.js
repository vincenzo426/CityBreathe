// src/components/Menu.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Per navigare al componente Login

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    toggleMenu(); // Chiude il menu
    navigate("/"); // Torna al componente Login
  };

  return (
    <div>
      {/* Icona hamburger */}
      <button
        onClick={toggleMenu}
        className="p-2 bg-white text-green-600 rounded-md focus:outline-none"
      >
        ☰
      </button>

      {/* Menu a tendina con transizione */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg w-full max-w-sm transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Chiudi menu */}
        <button
          onClick={toggleMenu}
          className="p-4 text-green-600 font-bold text-lg focus:outline-none"
        >
          ✕
        </button>

        {/* Voci del menu */}
        <ul className="mt-4">
          {/* Statistiche */}
          <li>
            <Link
              to="/statisitiche "
              className="block px-4 py-2 text-gray-800 hover:text-green-600"
              onClick={toggleMenu}
            >
              Statistiche
            </Link>
          </li>
          <hr className="border-t border-gray-600" />

          {/* Mappe */}
          <li>
            <Link
              to="/mappe"
              className="block px-4 py-2 text-gray-800 hover:text-green-600"
              onClick={toggleMenu}
            >
              Mappe
            </Link>
          </li>
          <hr className="border-t border-gray-600" />
        </ul>

        {/* Pulsante Logout */}
        <div className="absolute bottom-4 left-4 w-full">
          <hr className="border-t border-gray-600 mb-4" />
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-gray-800 hover:text-red-600 focus:outline-none"
          >
            <span className="text-lg font-bold">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
