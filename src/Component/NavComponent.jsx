import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { persistor } from "../Redux/store";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/userSlice";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.product);
  const cartCount = cart.length;
  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    navigate("/");
  };
  useGSAP(() => {
    gsap.from("nav", {
      opacity: 0,
      duration: 1,
      y: -20,
      ease: "power2.out",
    });
  });
  return (
    <nav
      className="bg-white w-screen shadow-md flex justify-between items-center sticky top-0 z-50"
      style={{ padding: "1rem 2rem" }}
    >
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        JesCart
      </Link>

      <div className="flex items-center gap-6 ">
        <Link
          to="/home"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Products
        </Link>
        <Link
          to="/checkout"
          className="relative text-gray-700 hover:text-blue-600 transition"
        >
          <FaShoppingCart size={20} />
          {cartCount > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs  rounded-full "
              style={{ padding: "0 4px" }}
            >
              {cartCount}
            </span>
          )}
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition"
          style={{ padding: "12px 4px" }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Nav;
