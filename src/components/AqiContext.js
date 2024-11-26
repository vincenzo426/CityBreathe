import React, { createContext, useState, useContext } from "react";

const AqiContext = createContext();

export const useAqi = () => useContext(AqiContext);

export const AqiProvider = ({ children }) => {
  const [aqi, setAqi] = useState(null);
  const [evaluation, setEvaluation] = useState("");
  const [pollutants, setPollutants] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState([]);

  return (
    <AqiContext.Provider
      value={{
        aqi,
        setAqi,
        evaluation,
        setEvaluation,
        pollutants,
        setPollutants,
        hourlyForecast,
        setHourlyForecast,
      }}
    >
      {children}
    </AqiContext.Provider>
  );
};
