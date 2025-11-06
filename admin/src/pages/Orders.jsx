import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBox,
  FaBoxOpen,
  FaShippingFast,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch all orders
  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log("Fetch Orders Error:", error);
    }
  };

  // ✅ Update status and refetch orders after success
  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: newStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("✅ Order Status Updated!");
        // refresh order list
        fetchAllOrders();
      } else {
        toast.error("⚠️ Failed to update status!");
      }
    } catch (error) {
      console.log("Status Update Error:", error);
      toast.error("⚠️ Something went wrong!");
    }
  };

  // ✅ Run only once or when token changes
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Order Placed":
        return <FaBox className="text-blue-500 text-lg" />;
      case "Packing":
        return <FaBoxOpen className="text-yellow-500 text-lg" />;
      case "Shipped":
        return <FaShippingFast className="text-indigo-500 text-lg" />;
      case "Out for delivery":
        return <FaTruck className="text-orange-500 text-lg" />;
      case "Delivered":
        return <FaCheckCircle className="text-green-500 text-lg" />;
      default:
        return <FaBox className="text-gray-400 text-lg" />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">
        🧾 All Orders
      </h2>

      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Payment</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Product Info */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 bg-gray-50 border rounded-lg px-3 py-2"
                          >
                            <img
                              src={item?.image}
                              alt={item?.name}
                              className="w-12 h-12 rounded object-cover border"
                            />
                            <div>
                              <p className="font-medium text-gray-800 text-sm">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.size} × {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* Customer Info */}
                  <td className="px-6 py-4">
                    <p className="font-medium">{order.address.fullName}</p>
                    <p className="text-xs text-gray-500">
                      {order.address.city}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.address.phone}
                    </p>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    ${order.amount.toFixed(2)}
                  </td>

                  {/* Payment */}
                  <td className="px-6 py-4">
                    {order.payment ? (
                      <span className="text-green-600 font-medium">Paid</span>
                    ) : (
                      <span className="text-red-500 font-medium">Pending</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <select
                        onChange={(e) => statusHandler(e, order._id)}
                        value={order.status}
                        className="text-sm border rounded-md px-2 py-1 focus:ring focus:ring-blue-200 outline-none"
                      >
                        <option>Order Placed</option>
                        <option>Packing</option>
                        <option>Shipped</option>
                        <option>Out for delivery</option>
                        <option>Delivered</option>
                      </select>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {new Date(order.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <FaBoxOpen className="text-5xl mb-3 text-gray-400" />
          <p className="text-lg font-medium">No orders found 😔</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
