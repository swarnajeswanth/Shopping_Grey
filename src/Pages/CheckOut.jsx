import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineCloseCircle, AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../Redux/productSlice";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "../Component/ResponsiveContainer.css";
gsap.registerPlugin(useGSAP);

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.product);
  const containerRef = useRef();
  const shippingRef = useRef();
  const summaryRef = useRef();

  const total = cart
    ?.reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }
    );

    gsap.from(shippingRef.current, {
      x: -40,
      opacity: 0,
      duration: 0.6,
      delay: 0.3,
      ease: "power2.out",
    });

    gsap.from(summaryRef.current, {
      x: 40,
      opacity: 0,
      duration: 0.6,
      delay: 0.4,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="responsive-container border border-gray-300 rounded bg-gray-100 font-sans"
      style={{ padding: "1rem" }}
    >
      <h2 className="text-xl font-bold border rounded w-fit px-2 py-1 mb-4">
        Checkout
      </h2>

      <div
        onClick={() => navigate(-1)}
        className="sticky top-0 z-50 bg-gray-100 p-2 flex items-center gap-2 text-blue-600 font-bold border-b border-gray-300 cursor-pointer"
      >
        <AiOutlineArrowLeft />
        Back
      </div>

      {/* Shipping Details */}
      <div ref={shippingRef} className="mt-4 space-y-2">
        <h3 className="text-lg font-bold text-center">Shipping Details</h3>
        <div>
          <label className="font-semibold block mb-1">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full p-2 rounded border border-gray-300"
          />
        </div>
        <div>
          <label className="font-semibold block mb-1">Address</label>
          <input
            type="text"
            placeholder="123 Main Street"
            className="w-full p-2 rounded border border-gray-300"
          />
        </div>
        <div>
          <label className="font-semibold block mb-1">City</label>
          <input
            type="text"
            placeholder="City"
            className="w-full p-2 rounded border border-gray-300"
          />
        </div>
        <div>
          <label className="font-semibold block mb-1">Zip Code</label>
          <input
            type="text"
            placeholder="123456"
            className="w-full p-2 rounded border border-gray-300"
          />
        </div>
      </div>

      {/* Order Summary */}
      <div ref={summaryRef} className="mt-6">
        <h3 className="text-lg font-bold mb-2">Order Summary</h3>
        {cart?.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white rounded shadow p-2 mb-2"
          >
            <span className="flex-grow text-sm">
              {item.title} x {item.quantity}
            </span>
            <AiOutlineCloseCircle
              onClick={() => dispatch(removeFromCart(item))}
              className="text-red-500 cursor-pointer"
              size={18}
            />
            <span className="ml-2 text-sm font-semibold">
              ${(item.quantity * item.price).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="text-right font-bold mt-2">Total: ${total}</div>
      </div>

      <button className="mt-4 w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition">
        Place Order
      </button>
    </div>
  );
}
