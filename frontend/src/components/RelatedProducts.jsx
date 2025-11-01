import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ productId, category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const navigate = useNavigate();

  // Filter related products (exclude current productId)
  const related = products.filter(
    (p) =>
      p.category === category &&
      p.subCategory === subCategory &&
      p._id !== productId
  );

  if (related.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 mt-16 text-center text-gray-500">
        No related products found.
      </div>
    );
  }

  // Duplicate items to create seamless scroll effect
  const marqueeItems = [...related, ...related];

  return (
    <div className="max-w-6xl mx-auto px-4 mt-16">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Related Products
      </h2>

      {/* Wrapper with hover-pauses animation via global CSS (see below) */}
      <div className="related-group overflow-hidden">
        <div className="flex gap-6 animate-scroll">
          {marqueeItems.map((product, index) => (
            // Use a button/div to handle navigation so anchor hrefs won't jump the page
            <div
              key={`${product._id}-${index}`}
              className="min-w-[220px] cursor-pointer mb-5"
              onClick={(e) => {
                e.preventDefault(); // prevent any native anchor behavior
                // Navigate to root-level product page
                navigate(`/product/${product._id}`);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(`/product/${product._id}`);
              }}
            >
              <ProductItem
                id={product._id}
                name={product.name}
                price={product.price}
                image={product.image[0]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
