import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaStar } from "react-icons/fa";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productSize, setProductSize] = useState("");

  // Find product by ID
  const product = products.find((item) => item._id === productId);

  // State for selected image
  const [selectedImage, setSelectedImage] = useState(
    product ? product.image[0] : ""
  );

  // ✅ Update selected image whenever product changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.image[0]);
      // Scroll to top when new product loads
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [productId, product]);

  const handleAddToCart = () => {
    if (productSize.length === 0) {
      toast.warn("Select size first!");
      return;
    }
    toast.success(`Product added to your cart!`);
    addToCart(productId, productSize);
  };

  const handleAddToBuy = () => {
    if (productSize.length === 0) {
      toast.warn("Select size first!");
      return;
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h2 className="text-gray-500 text-xl">Product not found.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Product Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Image Gallery */}
        <div>
          <div className="w-full h-[420px] bg-gray-50 rounded-xl shadow-md flex justify-center items-center overflow-hidden">
            <img
              src={selectedImage}
              alt={product.name}
              className="h-full object-contain rounded-xl transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex mt-4 gap-3 justify-center">
            {product.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer transition 
                  ${
                    selectedImage === img
                      ? "border-pink-500 scale-105"
                      : "border-gray-200 hover:border-pink-400"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            {product.name}
          </h1>

          {/* Ratings */}
          <div className="flex items-center gap-1 mb-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < 4 ? "text-yellow-400" : "text-gray-300"
                  } text-lg`}
                />
              ))}
            <span className="text-gray-500 text-sm ml-2">(120 reviews)</span>
          </div>

          <p className="text-pink-600 text-2xl font-bold mb-4">
            ${product.price}
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Sizes */}
          <div className="mb-6">
            <h3 className="text-gray-700 font-medium mb-2">Available Sizes:</h3>
            <div className="flex gap-3">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setProductSize(size)}
                  className="border border-gray-300 cursor-pointer rounded-md px-4 py-2 text-sm hover:bg-pink-500 hover:text-white transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => handleAddToCart()}
              className="bg-pink-600 text-white cursor-pointer px-6 py-3 rounded-lg hover:bg-pink-700 transition shadow-md"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleAddToBuy()}
              className="border border-pink-600 text-pink-600 cursor-pointer px-6 py-3 rounded-lg hover:bg-pink-50 transition"
            >
              Buy Now
            </button>
          </div>

          {/* Extra Info */}
          <hr className="mt-8 mb-4 border-gray-300" />
          <div className="text-gray-600 space-y-1 text-sm">
            <p>✅ 100% Original product</p>
            <p>💵 Cash on delivery is available</p>
            <p>🔄 Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description and Reviews Section */}
      <div className="mt-16">
        <div className="border-b border-gray-300 flex gap-8 pb-2">
          <button className="text-pink-600 font-semibold border-b-2 border-pink-600 pb-1">
            Description
          </button>
          <button className="text-gray-500 hover:text-pink-600 transition font-semibold">
            Reviews
          </button>
        </div>

        {/* Description Content */}
        <div className="mt-6 text-gray-700 leading-relaxed">
          <p>
            {product.description} Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Quisque efficitur, massa in tincidunt dictum, dolor
            lectus consequat elit, sed malesuada mi neque ac urna. Sed facilisis
            risus in sapien porttitor, a pretium nulla viverra.
          </p>
        </div>

        {/* Reviews Content */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Customer Reviews (3)
          </h3>

          <div className="space-y-4">
            <div className="border border-gray-200 p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-gray-300" />
                <span className="ml-2 text-sm text-gray-600">by John Doe</span>
              </div>
              <p className="text-gray-600">
                Great quality product! The material feels really soft and fits
                perfectly.
              </p>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-gray-300" />
                <FaStar className="text-gray-300" />
                <span className="ml-2 text-sm text-gray-600">by Sarah Lee</span>
              </div>
              <p className="text-gray-600">
                Nice product but shipping took a bit long. Otherwise, good
                purchase!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        productId={productId}
        category={product.category}
        subCategory={product.subCategory}
      />
    </div>
  );
};

export default Product;
