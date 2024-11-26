/**
 * Genera un valore casuale di AQI (Air Quality Index).
 * L'AQI è compreso tra 0 e 300.
 *
 * @returns {number} - Un valore casuale di AQI.
 */
export const generateRandomAQI = () => Math.floor(Math.random() * 300);

/**
 * Determina una valutazione qualitativa della qualità dell'aria in base al valore AQI.
 *
 * @param {number} value - Valore di AQI.
 * @returns {string} - Valutazione corrispondente:
 *  - "Eccellente" per AQI ≤ 50
 *  - "Moderata" per AQI ≤ 100
 *  - "Non sana per gruppi sensibili" per AQI ≤ 150
 *  - "Scarsa" per AQI ≤ 200
 *  - "Pericolosa" per AQI ≤ 300
 *  - "Apocalisse" per AQI > 300
 */
export const determineEvaluation = (value) => {
  if (value <= 50) return "Eccellente";
  if (value <= 100) return "Moderata";
  if (value <= 150) return "Non sana per gruppi sensibili";
  if (value <= 200) return "Scarsa";
  if (value <= 300) return "Pericolosa";
  return "Apocalisse";
};

/**
 * Genera i livelli di inquinanti principali (PM2.5, PM10, O3, NO2, SO2, CO)
 * basandosi su un valore di AQI dato.
 *
 * @param {number} aqiValue - Valore di AQI.
 * @returns {Object} - Oggetto contenente i livelli di inquinanti:
 *  - PM25: livello di particolato fine (µg/m³).
 *  - PM10: livello di particolato grossolano (µg/m³).
 *  - O3: livello di ozono troposferico (ppb).
 *  - NO2: livello di diossido di azoto (ppb).
 *  - SO2: livello di diossido di zolfo (ppb).
 *  - CO: livello di monossido di carbonio (ppm).
 * I livelli sono limitati a valori massimi (PM25 ≤ 60, PM10 ≤ 80).
 */
export const generatePollutants = (aqiValue) => {
  const maxPM25 = 60;
  const maxPM10 = 80;
  const pm25 = Math.min(aqiValue * 0.5, maxPM25);
  const pm10 = Math.min(aqiValue * 0.8, maxPM10);

  return {
    PM25: pm25.toFixed(1),
    PM10: pm10.toFixed(1),
    O3: (aqiValue * 0.4).toFixed(1),
    NO2: (aqiValue * 0.3).toFixed(1),
    SO2: (aqiValue * 0.2).toFixed(1),
    CO: (aqiValue * 0.1).toFixed(1),
  };
};
/**
 * Genera un valore casuale all'interno di un intervallo definito.
 * Se il valore generato è negativo, restituisce 0 come limite minimo.
 *
 * @param {number} baseValue - Valore base intorno al quale generare il valore casuale.
 * @param {number} range - Intervallo massimo di variazione (+/- dal valore base).
 * @returns {number} - Valore casuale generato, limitato a un minimo di 0.
 */
export const generateRandomWithinRange = (baseValue, range) => {
  const min = baseValue - range;
  const max = baseValue + range;
  return Math.max(0, Math.random() * (max - min) + min);
};
/**
 * Genera una previsione oraria dei valori di AQI per 24 ore.
 * Ogni valore è generato casualmente intorno a un valore base (baseAQI) con un range di variazione.
 *
 * @param {number} baseAQI - Valore base di AQI.
 * @returns {string[]} - Array di 24 valori AQI generati, ognuno come stringa con una cifra decimale.
 */
export const generateHourlyForecast = (baseAQI) => {
  const range = 100; // Intervallo di variazione massimo (±100).
  return Array.from({ length: 24 }, () =>
    generateRandomWithinRange(baseAQI, range).toFixed(1)
  );
};
