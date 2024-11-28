import axios from "axios";

// Configurazione della chiave API
const apiKey = "5b3ce3597851110001cf6248cff8fc03fd0d487fa397e5a08115efc1";

/**
 * Recupera le coordinate geografiche (latitudine e longitudine) di un indirizzo.
 * Utilizza il servizio OpenRouteService per effettuare una geocodifica (conversione di indirizzo in coordinate).
 *
 * @param {string} address - L'indirizzo da convertire in coordinate.
 * @returns {Promise<[number, number]>} - Un array contenente latitudine e longitudine.
 * @throws {Error} - Solleva un'eccezione se la richiesta fallisce.
 */
export const getCoordinates = async (address) => {
  try {
    const response = await axios.get(
      `https://api.openrouteservice.org/geocode/search`,
      {
        params: {
          api_key: apiKey,
          text: address,
        },
      }
    );

    // Estrae le coordinate dal primo risultato della ricerca
    const { coordinates } = response.data.features[0].geometry;
    return [coordinates[1], coordinates[0]]; // Inverti l'ordine da [lng, lat] a [lat, lng]
  } catch (error) {
    console.error("Errore durante il recupero delle coordinate:", error);
    throw new Error("Impossibile ottenere le coordinate.");
  }
};
/**
 * Recupera il percorso tra due punti geografici (coordinate di partenza e di arrivo).
 * Utilizza il servizio OpenRouteService per generare un percorso per camminatori.
 *
 * @param {[number, number]} startCoords - Coordinate di partenza [latitudine, longitudine].
 * @param {[number, number]} endCoords - Coordinate di arrivo [latitudine, longitudine].
 * @returns {Promise<[number, number][]>} - Un array di coordinate [lat, lng] che rappresentano il percorso.
 * @throws {Error} - Solleva un'eccezione se la richiesta fallisce.
 */
export const getRoute = async (startCoords, endCoords) => {
  try {
    const response = await axios.get(
      `https://api.openrouteservice.org/v2/directions/foot-walking`,
      {
        params: {
          api_key: apiKey,
          start: `${startCoords[1]},${startCoords[0]}`, // Formattazione in ordine [lng, lat]
          end: `${endCoords[1]},${endCoords[0]}`, // Formattazione in ordine [lng, lat]
          avoid_features: "highways,roads,tollways,ferries,hills", // Evita caratteristiche specifiche (ad esempio autostrade).
        },
      }
    );

    // Converte il percorso da [lng, lat] a [lat, lng] per ogni punto
    const coordinates = response.data.features[0].geometry.coordinates.map(
      ([lng, lat]) => [lat, lng]
    );

    return coordinates; // Restituisce il percorso
  } catch (error) {
    console.error("Errore durante il recupero del percorso:", error);
    throw new Error("Impossibile ottenere il percorso.");
  }
};
/**
 * Recupera un elenco di punti di interesse (POI), in particolare parchi, vicini a un punto geografico.
 * Utilizza il servizio OpenRouteService per cercare POI in un raggio specificato.
 *
 * @param {[number, number]} startCoords - Coordinate del punto di partenza [latitudine, longitudine].
 * @param {number} radius - Raggio di ricerca in metri (default: 2000).
 * @returns {Promise<[number, number][]>} - Un array di coordinate [lat, lng] dei parchi trovati.
 * @throws {Error} - Solleva un'eccezione se la richiesta fallisce.
 */
export const getNearbyParks = async (startCoords, radius = 2000) => {
  try {
    const response = await axios.post(
      `https://api.openrouteservice.org/pois`,
      {
        request: "pois", // Specifica la richiesta per ottenere POI.
        geometry: {
          geojson: {
            type: "Point",
            coordinates: [startCoords[1], startCoords[0]], // Ordine [lng, lat]
          },
          buffer: radius, // Definisce il raggio di ricerca intorno al punto.
        },
        filters: {
          category_ids: [151, 153], // Filtra categorie di POI per includere solo parchi.
        },
      },
      {
        headers: { Authorization: apiKey }, // Chiave API come header di autorizzazione.
      }
    );

    // Estrae le coordinate dei POI trovati e le converte in [lat, lng]
    const pois =
      response.data?.features?.map((feature) => {
        const [lng, lat] = feature.geometry.coordinates;
        return [lat, lng];
      }) || [];

    return pois; // Restituisce un array di POI
  } catch (error) {
    console.error("Errore durante il recupero dei POI:", error);
    throw new Error("Impossibile ottenere i punti di interesse.");
  }
};

/**
 * Calcola una destinazione casuale partendo da un punto iniziale e da una distanza specificata.
 * La destinazione è scelta in una direzione casuale (nord, sud, est, ovest).
 *
 * @param {[number, number]} startCoords - Coordinate di partenza [latitudine, longitudine].
 * @param {number} distanceKm - Distanza desiderata in chilometri.
 * @returns {[number, number]} - Coordinate della destinazione [latitudine, longitudine].
 */
export const calculateDestination = (startCoords, distanceKm) => {
  const [startLat, startLng] = startCoords;
  let distanceDividecByTwo = distanceKm / 2;
  const distanceInDegrees = distanceDividecByTwo / 111.32; // Conversione della distanza da km a gradi (1 grado ≈ 111.32 km).

  // Direzioni possibili per il calcolo
  const directions = ["north", "south", "east", "west"];
  const randomDirection =
    directions[Math.floor(Math.random() * directions.length)]; // Seleziona una direzione casuale.

  let endLat = startLat;
  let endLng = startLng;

  // Modifica le coordinate in base alla direzione scelta
  if (randomDirection === "north") {
    endLat = startLat + distanceInDegrees; // Incrementa la latitudine
  } else if (randomDirection === "south") {
    endLat = startLat - distanceInDegrees; // Decrementa la latitudine
  } else if (randomDirection === "east") {
    endLng =
      startLng + distanceInDegrees / Math.cos(startLat * (Math.PI / 180)); // Incrementa longitudine, correggendo per la latitudine
  } else if (randomDirection === "west") {
    endLng =
      startLng - distanceInDegrees / Math.cos(startLat * (Math.PI / 180)); // Decrementa longitudine, correggendo per la latitudine
  }

  return [endLat, endLng]; // Restituisce le coordinate della destinazione
};
