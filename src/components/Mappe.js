import React, { useState, useRef } from "react";
import Header from "./Header";
import MenuFooter from "./MenuFooter";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaSearch } from "react-icons/fa";
import {
  getCoordinates,
  getRoute,
  getNearbyParks,
  calculateDestination,
} from "../utils/apiUtils"; // Importa i metodi
import locator from "../icons/placeholder.png";
import iconPark from "../icons/park.png";
// Icona personalizzata per i marker
const redIcon = new L.Icon({
  iconUrl: locator,
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
  const [startAddress, setStartAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [searchParks, setSearchParks] = useState(false);
  const [route, setRoute] = useState([]);
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [poiMarkers, setPoiMarkers] = useState([]);
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Mappe" />
      <div className="p-6">
        <div className="mb-4 p-4 bg-white shadow-md rounded">
          <h2 className="text-lg font-semibold mb-2">Cerca Percorso</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Indirizzo di partenza"
              value={startAddress}
              onChange={(e) => setStartAddress(e.target.value)}
            />
            <input
              type="number"
              className="w-full border p-2 rounded"
              placeholder="Km da percorrere"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="searchParks"
              checked={searchParks}
              onChange={(e) => setSearchParks(e.target.checked)}
            />
            <label htmlFor="searchParks">Includi Aree Verdi Vicine</label>
          </div>
          <button
            className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center justify-center"
            onClick={handleSearch}
          >
            <FaSearch className="mr-2" /> Cerca
          </button>
        </div>

        <MapContainer
          center={[44.4949, 11.3426]}
          zoom={13}
          className="w-full h-[29rem] rounded-lg shadow-md border-black border-2"
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {startCoords && <Marker position={startCoords} icon={redIcon} />}
          {endCoords && <Marker position={endCoords} icon={redIcon} />}
          {route.length > 0 && <Polyline positions={route} color="green" />}
          {searchParks &&
            poiMarkers.map((pos, index) => (
              <Marker key={index} position={pos} icon={greenIcon} />
            ))}
        </MapContainer>

        <MenuFooter />
      </div>
    </div>
  );
};

export default Mappe;
