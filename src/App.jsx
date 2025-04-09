import React, { useEffect } from "react";
import Login from "./Pages/Login";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default App;
