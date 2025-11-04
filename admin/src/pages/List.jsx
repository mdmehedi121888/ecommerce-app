import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import { backendUrl } from "../App";

const List = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.message || []);
      } else {
        toast.error("⚠️ Failed to fetch products!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching products!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove a product
  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("🗑️ Product removed successfully!");
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error("❌ Failed to remove product!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while removing product!");
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      <h2 className="text-2xl font-semibold text-pink-600 mb-6">
        Product List
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 py-8">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No products found. Please add some!
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition relative group"
            >
              {/* 🖼️ Image */}
              <div className="w-full h-40 mb-4 overflow-hidden rounded-lg bg-gray-50">
                {product.image && product.image.length > 0 ? (
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* 📦 Info */}
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Category: {product.category}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Sub: {product.subCategory}
              </p>
              <p className="font-semibold text-pink-600">${product.price}</p>

              <div className="flex flex-wrap gap-1 mt-2">
                {product.sizes?.map((size) => (
                  <span
                    key={size}
                    className="text-xs border border-pink-400 text-pink-600 px-2 py-0.5 rounded-full"
                  >
                    {size}
                  </span>
                ))}
              </div>

              {product.bestSeller && (
                <span className="inline-block mt-2 text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full font-medium">
                  Best Seller
                </span>
              )}

              {/* 🗑️ Delete button */}
              <button
                onClick={() => handleRemove(product._id)}
                disabled={loading}
                className="absolute top-2 right-2 text-pink-600 hover:text-pink-800 bg-white rounded-full p-2 shadow-sm opacity-0 group-hover:opacity-100 transition"
              >
                <FaTrashAlt size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
