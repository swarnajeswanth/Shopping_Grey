import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineCloseCircle, AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../Redux/productSlice";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "../Component/ResponsiveContainer.css";
import toast from "react-hot-toast";
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
    <div className="flex justify-center items-center border h-screen  bg-[#f0f4f8] text-[#1a202c]">
      <div
        ref={containerRef}
        className="responsive-container border w-full h-fit border-gray-300 rounded bg-gray-100 font-sans"
        style={{ padding: "1rem" }}
      >
        <h2
          className="text-xl font-bold border rounded w-fit  mb-4"
          style={{ padding: "0.5rem 1rem" }}
        >
          Checkout
        </h2>

        <div
          onClick={() => navigate(-1)}
          className="sticky top-0 z-50 bg-gray-100  flex items-center gap-2 text-blue-600 font-bold border-b border-gray-300 cursor-pointer"
          style={{ padding: "0.5rem 1rem" }}
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
              style={{ padding: "0.5rem 1rem" }}
              className="w-full  rounded border border-gray-300"
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Address</label>
            <input
              type="text"
              placeholder="123 Main Street"
              style={{ padding: "0.5rem 1rem" }}
              className="w-full rounded border border-gray-300"
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">City</label>
            <input
              type="text"
              placeholder="City"
              style={{ padding: "0.5rem 1rem" }}
              className="w-full  rounded border border-gray-300"
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Zip Code</label>
            <input
              type="text"
              placeholder="123456"
              style={{ padding: "0.5rem 1rem" }}
              className="w-full  rounded border border-gray-300"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div ref={summaryRef} style={{ margin: "0.5rem 0" }}>
          <h3 className="text-lg font-bold " style={{ margin: "0.5rem 0" }}>
            Order Summary
          </h3>
          {cart?.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white rounded shadow "
              style={{ padding: "0.5rem 1rem", margin: "0.5rem 0" }}
            >
              <span className="flex-grow text-sm">
                {item.title} x {item.quantity}
              </span>
              <AiOutlineCloseCircle
                onClick={() => {
                  dispatch(removeFromCart(item));
                  toast.success("Item removed from Cart!");
                }}
                className="text-red-500 cursor-pointer"
                size={18}
              />
              <span
                className=" text-sm font-semibold"
                style={{ marginLeft: "1rem" }}
              >
                ${(item.quantity * item.price).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="text-right font-bold " style={{ marginTop: "1rem" }}>
            Total: ${total}
          </div>
        </div>

        <button
          className=" w-full bg-green-600 text-white font-bold  rounded hover:bg-green-700 transition"
          style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
