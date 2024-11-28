import React, { useState, useRef, useContext } from "react";
import Header from "./Header";
import MenuFooter from "./MenuFooter";
import { CorsaContext } from "./CorsaContext"; // Importa il Context
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import startIcon from "../icons/start.png";
import finishIcon from "../icons/finish-line.png";
import { FaSearch } from "react-icons/fa";

import {
  getCoordinates,
  getRoute,
  getNearbyParks,
  calculateDestination,
} from "../utils/apiUtils"; // Importa i metodi

import iconPark from "../icons/park.png";
import startRun from "../icons/startRun.png";
import racingFlag from "../icons/racing-flag.png";
// Icona personalizzata per i marker
const start = new L.Icon({
  iconUrl: startRun,
  iconSize: [35, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "/images/marker-shadow.png",
  shadowSize: [41, 41],
  className: "red-marker",
});
const end = new L.Icon({
  iconUrl: racingFlag,
  iconSize: [35, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "/images/marker-shadow.png",
  shadowSize: [41, 41],
  className: "red-marker",
});
const greenIcon = new L.Icon({
  iconUrl: iconPark,
  iconSize: [35, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "/images/marker-shadow.png",
  shadowSize: [41, 41],
  className: "green-marker",
});

const Mappe = () => {
  const { aggiungiCorsa } = useContext(CorsaContext); // Accedi al Context
  const [startAddress, setStartAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [searchParks, setSearchParks] = useState(false);
  const [route, setRoute] = useState([]);
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [poiMarkers, setPoiMarkers] = useState([]);
  const [isRunStarted, setIsRunStarted] = useState(false);
  const mapRef = useRef();

  const handleSearch = async () => {
    if (!startAddress || !distance) {
      alert("Compila tutti i campi!");
      return;
    }

    try {
      const start = await getCoordinates(startAddress);
      setStartCoords(start);

      const randomEnd = calculateDestination(start, parseInt(distance)); // Usa il metodo importato
      setEndCoords(randomEnd);

      const routeCoordinates = await getRoute(start, randomEnd);
      setRoute(routeCoordinates);

      if (searchParks) {
        const parks = await getNearbyParks(start);
        setPoiMarkers(parks);
      }

      const map = mapRef.current;
      if (map) {
        const bounds = L.latLngBounds([start, randomEnd, ...poiMarkers]);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    } catch (error) {
      alert(error.message || "Errore durante la ricerca.");
    }
  };
  const handleRunToggle = () => {
    if (isRunStarted) {
      const minPerKm = Math.random() * (6 - 4) + 4; // Tempo medio tra 4 e 6 min/km
      const totalTime = (parseInt(distance) * minPerKm).toFixed(2); // Tempo totale in minuti
      const speed = (60 / minPerKm).toFixed(2); // Velocità media in km/h

      // Calcola l'andamento della velocità
      const intervals = 10; // Numero di intervalli per il calcolo
      const intervalTime = totalTime / intervals; // Tempo per intervallo
      // const intervalDistance = distance / intervals; // Distanza per intervallo
      const speedOverTime = Array.from({ length: intervals }, (_, i) => {
        const randomFluctuation = Math.random() * 0.5 - 0.25; // Variazione casuale tra -0.25 e 0.25 km/h
        const currentSpeed = (60 / (minPerKm + randomFluctuation)).toFixed(2);
        return {
          time: (i * intervalTime).toFixed(2) + " min",
          speed: `${currentSpeed} km/h`,
        };
      });

      // Salva i dati nel Context
      aggiungiCorsa({
        startAddress,
        distance: `${distance} km`,
        time: `${totalTime} min`,
        speed: `${speed} km/h`,
        speedOverTime, // Salva l'andamento della velocità
      });

      // Ripristina lo stato iniziale
      setStartAddress("");
      setDistance("");
      setRoute([]);
      setStartCoords(null);
      setEndCoords(null);
    }

    setIsRunStarted(!isRunStarted);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Mappe" />
      <div className="p-6">
        <div className="mb-4 p-4 bg-white shadow-md rounded">
          <h2 className="text-lg font-semibold mb-2">Cerca Percorso</h2>
          <h1 className="text-sm  mb-2">
            Il percorso calcolato va inteso come andata e ritorno
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Indirizzo di partenza"
              value={startAddress}
              onChange={(e) => setStartAddress(e.target.value)}
              disabled={isRunStarted} // Disabilitato durante la corsa
            />
            <input
              type="number"
              className="w-full border p-2 rounded"
              placeholder="Km da percorrere"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              disabled={isRunStarted} // Disabilitato durante la corsa
            />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="searchParks"
              checked={searchParks}
              onChange={(e) => setSearchParks(e.target.checked)}
            />
            <label htmlFor="searchParks">
              Includi aree verdi nelle vicinanze
            </label>
          </div>
          <div className="mt-4 flex gap-4">
            <button
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center justify-center"
              onClick={handleSearch}
              disabled={isRunStarted} // Disabilitato durante la corsa
            >
              <FaSearch className="mr-2" />
              cerca
            </button>
            {route.length > 0 && (
              <button
                className={`p-2 rounded flex items-center justify-center ${
                  isRunStarted
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-yellow-500 hover:bg-yellow-600"
                } text-white`}
                onClick={handleRunToggle}
              >
                {isRunStarted ? (
                  <img
                    src={finishIcon}
                    alt="Descrizione"
                    className="w-10 h-10 mr-2"
                  />
                ) : (
                  <img
                    src={startIcon}
                    alt="Descrizione"
                    className="w-8 h-8 mr-2"
                  />
                )}
                {isRunStarted ? "Termina Corsa" : "Inizia Corsa"}
              </button>
            )}
          </div>
        </div>
        {isRunStarted && (
          <div className="mb-4 p-4 bg-green-100 shadow-md rounded text-lg text-center font-semibold ">
            Corsa iniziata!
          </div>
        )}
        <div className="sticky top-0 z-10">
          {" "}
          {/* Aggiunto contenitore per mappa */}
          <MapContainer
            center={[44.4949, 11.3426]}
            zoom={13}
            className="w-full h-[27rem] rounded-lg shadow-md border-black border-2"
            whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {startCoords && <Marker position={startCoords} icon={start} />}
            {endCoords && <Marker position={endCoords} icon={end} />}
            {route.length > 0 && <Polyline positions={route} color="green" />}
            {searchParks &&
              poiMarkers.map((pos, index) => (
                <Marker key={index} position={pos} icon={greenIcon} />
              ))}
          </MapContainer>
        </div>
        <MenuFooter />
      </div>
    </div>
  );
};

export default Mappe;
