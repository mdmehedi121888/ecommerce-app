import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaTruck } from "react-icons/fa";

const Orders = () => {
  const { cartItems, products, currency, delivery_fee } =
    useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Build orders from cartItems
    const tempOrders = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) {
          const product = products.find((p) => p._id === productId);
          if (product) {
            tempOrders.push({
              _id: productId,
              name: product.name,
              image: product.image[0],
              size,
              quantity,
              price: product.price,
              deliveryFee: delivery_fee,
              status: "Processing", // default order status
              orderDate: new Date().toLocaleDateString(),
            });
          }
        }
      }
    }

    setOrders(tempOrders);
  }, [cartItems, products, delivery_fee]);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <p className="text-gray-500 text-lg">No orders placed yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={`${order._id}-${order.size}-${index}`}
            className="border p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {order.name}
                </h3>
                <p className="text-gray-500">Size: {order.size}</p>
                <p className="text-gray-500">Ordered on: {order.orderDate}</p>
                <p className="text-gray-500">
                  Delivery Fee: {currency}
                  {order.deliveryFee.toFixed(2)}
                </p>
                <p className="text-pink-600 font-medium">
                  Total: {currency}
                  {(order.price * order.quantity + order.deliveryFee).toFixed(
                    2
                  )}
                </p>
              </div>

              {/* Order Status / Tracking */}
              <div className="flex items-center gap-2 mt-3 md:mt-0">
                <FaTruck className="text-xl text-gray-500" />
                <span className="text-gray-700 font-medium">
                  {order.status}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-4 flex items-center gap-4 border-t pt-4">
              <img
                src={order.image}
                alt={order.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div>
                <p className="text-gray-700 font-medium">{order.name}</p>
                <p className="text-gray-500 text-sm">
                  Quantity: {order.quantity}
                </p>
                <p className="text-pink-600 font-semibold">
                  Price: {currency}
                  {order.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
