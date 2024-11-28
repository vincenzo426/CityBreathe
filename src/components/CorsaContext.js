import React, { createContext, useState } from "react";

// Creazione del Context
export const CorsaContext = createContext();

// Provider del Context
export const CorsaProvider = ({ children }) => {
  const [corse, setCorse] = useState([]); // Stato per salvare le corse

  // Funzione per aggiungere una nuova corsa
  const aggiungiCorsa = (corsa) => {
    setCorse((prev) => [...prev, corsa]);
  };

  return (
    <CorsaContext.Provider value={{ corse, aggiungiCorsa }}>
      {children}
    </CorsaContext.Provider>
  );
};
