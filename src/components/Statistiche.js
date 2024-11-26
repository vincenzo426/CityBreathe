import React, { useEffect } from "react";
import { useAqi } from "./AqiContext";
import Header from "./Header";
import Card from "./Card";
import Dettaglio from "./Dettaglio";
import Grafico from "./Grafico";
import Messaggio from "./Messaggio";
import MenuFooter from "./MenuFooter";
import {
  generateRandomAQI,
  determineEvaluation,
  generatePollutants,
  generateHourlyForecast,
} from "../utils/aqiUtils";

const Statistiche = () => {
  const {
    aqi,
    setAqi,
    evaluation,
    setEvaluation,
    pollutants,
    setPollutants,
    hourlyForecast,
    setHourlyForecast,
  } = useAqi();

  const explanations = {
    PM25: "Il PM2.5 è costituito da particelle sottili che possono penetrare profondamente nei polmoni e nel sistema circolatorio, causando problemi respiratori e cardiovascolari.",
    PM10: "Il PM10 comprende particelle più grandi, ma comunque pericolose, in grado di irritare le vie respiratorie.",
    O3: "L'ozono troposferico è un inquinante secondario formato da reazioni chimiche tra altre sostanze. Può causare irritazioni agli occhi e ai polmoni.",
    NO2: "Il diossido di azoto è prodotto principalmente dai veicoli e può peggiorare le malattie respiratorie.",
    SO2: "Il diossido di zolfo è emesso principalmente dalla combustione di combustibili fossili e può causare irritazioni respiratorie.",
    CO: "Il monossido di carbonio è un gas incolore e inodore che può ridurre la capacità del sangue di trasportare ossigeno.",
  };

  useEffect(() => {
    if (aqi === null) {
      const initialAQI = generateRandomAQI();
      setAqi(initialAQI);
      setEvaluation(determineEvaluation(initialAQI));
      setPollutants(generatePollutants(initialAQI));
      setHourlyForecast(generateHourlyForecast(initialAQI));
    }
  }, [aqi, setAqi, setEvaluation, setPollutants, setHourlyForecast]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Home" />
      <div className="p-6">
        <Card citta="Bologna" valoreAQI={aqi} valutazione={evaluation} />
        <Messaggio valutazione={evaluation} />
        <Grafico hourlyData={hourlyForecast} />
        <Dettaglio pollutants={pollutants} explanations={explanations} />
        <MenuFooter />
      </div>
    </div>
  );
};

export default Statistiche;
