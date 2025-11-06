import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTruckFast, FaCreditCard, FaClock } from "react-icons/fa6";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [ordersData, setOrdersData] = useState([]);

  // ✅ Load Orders
  const loadOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrdersData(response.data.orders);
      } else {
        toast.error(response.data.message || "Failed to load orders!");
      }
    } catch (error) {
      console.error("Load Orders Error:", error);
      toast.error("Something went wrong while fetching your orders!");
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  // 🕒 Format Date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // 🏷️ Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "text-blue-500 bg-blue-50";
      case "Shipped":
        return "text-yellow-600 bg-yellow-50";
      case "Delivered":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-pink-600 mb-8 flex items-center gap-2">
          My Orders
        </h2>

        {ordersData.length === 0 ? (
          <div className="text-center py-24 text-gray-500 text-lg">
            You have no orders yet 🛒
          </div>
        ) : (
          <div className="space-y-8">
            {ordersData.map((order, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Order #{index + 1}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Placed on {formatDate(order.date)}
                    </p>
                  </div>
                  <div
                    className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-gray-100">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image?.[0]}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                        />
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Size: {item.size} | Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-semibold text-gray-700">
                            {currency}
                            {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex flex-wrap justify-between items-center gap-4 px-6 py-4 border-t border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <FaCreditCard className="text-gray-500" size={15} />
                    <span>
                      Payment:{" "}
                      {order.payment ? (
                        <span className="text-green-600 font-medium">Paid</span>
                      ) : (
                        <span className="text-gray-700">Cash on Delivery</span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <FaTruckFast className="text-gray-500" size={16} />
                    <span className="font-medium">
                      Total: {currency}
                      {order.amount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <FaClock className="text-gray-500" size={14} />
                    <span>{formatDate(order.date)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
