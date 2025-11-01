import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { ImCross } from "react-icons/im";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  // Handle visibility and redirect if needed
  useEffect(() => {
    if (showSearch) {
      if (location.pathname !== "/collection") {
        navigate("/collection");
      }
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [showSearch, location.pathname, navigate]);

  if (!visible) return null;

  // Handle input change
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full max-w-md mx-auto my-5 flex items-center space-x-2">
      {/* Input with search icon */}
      <div className="relative flex-1">
        <FiSearch className="absolute left-3 top-2.5 text-gray-400 text-lg pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm transition duration-200"
          autoFocus
        />
      </div>

      {/* Close button */}
      <button
        onClick={() => setShowSearch(false)}
        className="p-2 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 text-pink-600 transition-colors duration-200"
      >
        <ImCross className="text-lg" />
      </button>
    </div>
  );
};

export default SearchBar;
