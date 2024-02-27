import { useState } from "react";
import Home from "./pages/home";
import { Analytics } from "@vercel/analytics/react";
import { Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Analytics />
    </div>
  );
}

export default App;
