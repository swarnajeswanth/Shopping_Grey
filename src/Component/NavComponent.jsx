import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { persistor } from "../Redux/store";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/userSlice";
const Nav = ({ cartCount = 2 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    navigate("/");
  };

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
        <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
          Home
        </Link>
        <Link
          to="/products"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Products
        </Link>
        <Link
          to="/cart"
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
