import React, { useEffect } from "react";
import Login from "./Pages/Login";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Footer from "./Pages/CheckOut";
import CheckoutPage from "./Pages/CheckOut";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
};

export default App;
