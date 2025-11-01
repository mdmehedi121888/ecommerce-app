import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, name, price, image }) => {
  const { currency } = useContext(ShopContext);
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/product/${id}`)}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group">
        {/* Product Image */}
        <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {name}
          </h3>
          <p className="text-blue-600 font-medium mt-1">
            {currency}
            {price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
