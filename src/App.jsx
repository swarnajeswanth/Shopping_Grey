import React, { useEffect } from "react";
import Login from "./Pages/Login";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CheckoutPage from "./Pages/CheckOut";
import CartPage from "./Pages/CartPage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Toaster } from "react-hot-toast";
gsap.registerPlugin(useGSAP);
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
