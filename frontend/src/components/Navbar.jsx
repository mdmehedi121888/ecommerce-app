import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { setShowSearch, getCartCount, token, setToken, setCartItems } =
    useContext(ShopContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // ✅ Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    setToken("");
    setCartItems({});
    localStorage.removeItem("token");
    setProfileOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link to="/">
            <div className="shrink-0 text-2xl font-bold text-gray-800">
              <img
                src={assets.logo}
                alt="Logo"
                className="h-10 w-auto rounded-full"
              />
            </div>
          </Link>

          {/* Middle: Nav Links */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: "HOME", to: "/" },
              { name: "COLLECTION", to: "/collection" },
              { name: "ABOUT", to: "/about" },
              { name: "CONTACT", to: "/contact" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative font-medium transition-all duration-200 pb-1 ${
                    isActive
                      ? "text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600"
                      : "text-gray-700  hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:w-full hover:h-0.5 "
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-4 relative">
            {/* Search */}
            <FiSearch
              onClick={() => setShowSearch((prev) => !prev)}
              className="text-xl text-gray-700 cursor-pointer  transition-colors duration-200"
            />

            {/* Profile Menu */}
            <div className="relative" ref={dropdownRef}>
              <FiUser
                className="text-xl text-gray-700 cursor-pointer "
                onClick={() => {
                  if (!token) {
                    navigate("/login");
                  } else {
                    setProfileOpen((prev) => !prev);
                  }
                }}
              />
              {token && profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Profile
                  </NavLink>
                  <NavLink
                    to="/orders"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    Orders
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <FiShoppingCart className="text-xl text-gray-700 cursor-pointer " />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {getCartCount()}
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden focus:outline-none cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <FiX className="text-2xl text-gray-700" />
              ) : (
                <FiMenu className="text-2xl text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          {[
            { name: "HOME", to: "/" },
            { name: "COLLECTION", to: "/collection" },
            { name: "ABOUT", to: "/about" },
            { name: "CONTACT", to: "/contact" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
