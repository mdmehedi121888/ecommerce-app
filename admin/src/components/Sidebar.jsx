import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaListAlt, FaShoppingBag, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    if (screenSize <= 640) {
      setIsCollapsed(true);
    }

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  const menuItems = [
    { name: "Add Items", icon: <FaPlusCircle />, path: "/add" },
    { name: "List Items", icon: <FaListAlt />, path: "/list" },
    { name: "Orders", icon: <FaShoppingBag />, path: "/orders" },
  ];

  return (
    <div
      className={`bg-linear-to-b from-pink-600 to-pink-800 text-white transition-all duration-300 shadow-lg flex flex-col fixed md:relative ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* 🔘 Top Section (Logo + Toggle Button) */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-pink-500">
        {!isCollapsed && (
          <h1 className="text-lg font-bold tracking-wide">Admin</h1>
        )}
        <button
          className="text-white focus:outline-none hover:text-pink-200"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* 🧭 Navigation Menu */}
      <div className="flex-1 mt-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 hover:bg-pink-700 transition-all duration-200"
          >
            <div className="text-xl">{item.icon}</div>
            {!isCollapsed && (
              <span className="text-sm font-medium tracking-wide">
                {item.name}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* ⚙️ Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-pink-500 text-xs text-center text-pink-200">
          © {new Date().getFullYear()} Hasanah
        </div>
      )}
    </div>
  );
};

export default Sidebar;
