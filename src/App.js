import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Statistiche from "./components/Statistiche";
import Mappe from "./components/Mappe";
import { AqiProvider } from "./components/AqiContext";
function App() {
  return (
    <AqiProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/statistiche" element={<Statistiche />} />
          <Route path="/mappe" element={<Mappe />} />
        </Routes>
      </Router>
    </AqiProvider>
  );
}

export default App;
