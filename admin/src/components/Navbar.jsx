import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={assets.hasanah_logo}
            alt="Admin Logo"
            className="w-8 h-8 object-contain rounded-full"
          />
          <h1 className="text-xl font-semibold text-pink-600">
            Admin Dashboard
          </h1>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-pink-600 cursor-pointer hover:bg-pink-700 text-white px-5 py-2 rounded-lg shadow-sm font-medium transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
