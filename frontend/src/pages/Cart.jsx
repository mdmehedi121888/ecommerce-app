import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "./../context/ShopContext";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { assets } from "../assets/assets";

const Cart = () => {
  const {
    products,
    cartItems,
    currency,
    updateQuantity,
    delivery_fee,
    getSubtotal,
    getTotal,
    navigate,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  // 🧠 Build cart data from context
  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  // 🧾 Calculate subtotal & total from context
  const subtotal = getSubtotal();
  const total = getTotal();

  // 🧹 Handle remove item
  const handleRemove = (id, size) => {
    updateQuantity(id, size, 0);
    toast.info("Item removed from cart!");
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[70vh] flex flex-col">
      <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>

      {cartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center grow text-center">
          <img
            src={assets.empty_cart}
            alt="Empty Cart"
            className="w-60 h-60 object-contain mb-6 opacity-90"
          />
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            Your cart is empty !
          </h3>
          <p className="text-gray-500 mb-6">
            Looks like you haven’t added anything yet.
          </p>
          <button
            onClick={() => navigate("/collection")}
            className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* 🧺 Left side - items list */}
            <div className="md:col-span-2 space-y-6">
              {cartData.map((item) => {
                const product = products.find((p) => p._id === item._id);
                if (!product) return null;

                return (
                  <div
                    key={`${item._id}-${item.size}`}
                    className="flex flex-col md:flex-row items-center justify-between border p-4 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    {/* Product Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Size: <span className="font-medium">{item.size}</span>
                        </p>
                        <p className="text-pink-600 font-medium mt-1">
                          {currency}
                          {product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.size, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="bg-gray-200 cursor-pointer px-3 py-1 rounded-md text-lg font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        −
                      </button>
                      <span className="font-medium text-lg">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.size, item.quantity + 1)
                        }
                        className="bg-gray-200 cursor-pointer px-3 py-1 rounded-md text-lg font-semibold hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    {/* Total & Remove */}
                    <div className="flex flex-col items-end mt-4 md:mt-0 space-y-2">
                      <p className="text-gray-800 font-semibold text-lg">
                        {currency}
                        {(product.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemove(item._id, item.size)}
                        className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-100 hover:text-red-700 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                      >
                        <FaTrash className="text-base" />
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 🧾 Right side - summary */}
            <div className="border p-6 rounded-lg shadow-md h-fit">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>
                    {currency}
                    {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span>
                    {currency}
                    {delivery_fee.toFixed(2)}
                  </span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>
                    {currency}
                    {total.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate("/place-order")}
                className="mt-6 cursor-pointer w-full bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700 transition"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
