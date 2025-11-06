import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import axios from "axios";

const PlaceOrder = () => {
  const {
    getSubtotal,
    getTotal,
    delivery_fee,
    currency,
    setCartItems,
    cartItems,
    backendUrl,
    token,
    products,
    navigate,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const subtotal = getSubtotal();
  const total = getTotal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // 🧩 Validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    // 🛒 Collect cart items
    let orderItems = [];

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          const itemInfo = structuredClone(
            products.find((product) => product._id === items)
          );
          if (itemInfo) {
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);
          }
        }
      }
    }

    const orderData = {
      userId: localStorage.getItem("userId"),
      address: formData,
      items: orderItems,
      amount: getTotal(),
      paymentMethod,
    };

    try {
      switch (paymentMethod) {
        case "cod":
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            setCartItems({});
            toast.success("Order placed successfully!");
            navigate("/orders");
          } else {
            toast.error(response.data.message || "Order failed!");
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/place/stripe",
            orderData,
            { headers: { token } }
          );

          if (responseStripe.data.success) {
            window.location.href = responseStripe.data.session_url;
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        default:
          toast.error("Invalid payment method selected!");
          break;
      }
    } catch (error) {
      console.error("Order Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while placing order!"
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 min-h-[80vh]">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Checkout</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {/* 🚚 Shipping Details */}
        <div className="md:col-span-2 border p-6 rounded-xl shadow-sm bg-white">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Shipping Details
          </h3>

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            {/* Row 1 */}
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full focus:outline-pink-600 focus:ring-2 focus:ring-pink-300 transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full focus:outline-pink-600 focus:ring-2 focus:ring-pink-300 transition"
              />
            </div>

            {/* Row 2 */}
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full focus:outline-pink-600 focus:ring-2 focus:ring-pink-300 transition"
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full focus:outline-pink-600 focus:ring-2 focus:ring-pink-300 transition"
              />
            </div>

            {/* Address */}
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full focus:outline-pink-600 focus:ring-2 focus:ring-pink-300 transition"
            />

            {/* City */}
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full focus:outline-pink-600 focus:ring-2 focus:ring-pink-300 transition"
            />

            {/* 💳 Payment Method */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
                Payment Method
              </h3>

              <div className="flex items-center gap-6">
                {/* Stripe */}
                <label
                  className={`flex items-center gap-3 border rounded-lg px-4 py-2 cursor-pointer transition ${
                    paymentMethod === "stripe"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-green-700"
                  />
                  <img
                    src={assets.stripe_logo}
                    alt="Stripe"
                    className="w-14 h-auto object-contain"
                  />
                  <span className="text-gray-700 font-medium"></span>
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`flex items-center gap-3 border rounded-lg px-4 py-2 cursor-pointer transition ${
                    paymentMethod === "cod"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-green-700"
                  />

                  <span className="text-gray-700 font-medium">
                    Cash on Delivery
                  </span>
                </label>
              </div>
            </div>

            {/* 🛒 Place Order Button */}
            <button
              type="submit"
              className="mt-6 w-full bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700 transition cursor-pointer font-medium text-lg"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* 💰 Order Summary */}
        <div className="border p-6 rounded-xl shadow-md bg-white h-fit">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
            Order Summary
          </h3>

          <div className="space-y-3 text-gray-700">
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
              <span className="text-pink-600">
                {currency}
                {total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
