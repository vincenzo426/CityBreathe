import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Statistiche from "./components/Statistiche";
import Mappe from "./components/Mappe";
import { AqiProvider } from "./components/AqiContext";
import { CorsaProvider } from "./components/CorsaContext";
import Progressi from "./components/Progressi";


function App() {
  return (
    <CorsaProvider>
    <AqiProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/statistiche" element={<Statistiche />} />
          <Route path="/mappe" element={<Mappe />} />
          <Route
            path="/progressi"
            element={
              <Progressi/>
            }
          />
        </Routes>
      </Router>
    </AqiProvider>
    </CorsaProvider>
  );
}

export default App;
