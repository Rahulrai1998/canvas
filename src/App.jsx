import React from "react";
import FabricCanvas from "./components/FabricCanvas";
import "./styles.css";
import Home from "./pages/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/canvas/:id" element={<FabricCanvas />} />
      </Routes>
    </Router>
  );
}

export default App;
