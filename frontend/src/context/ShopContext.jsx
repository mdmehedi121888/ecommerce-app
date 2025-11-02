import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { products } from "./../assets/assets";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 35;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else cartData[itemId][size] = 1;
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
  };

  useEffect(() => {}, [cartItems]);

  const getCartCount = () => {
    let totalCount = 0;

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          totalCount += cartItems[productId][size];
        }
      }
    }

    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = async () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0)
          totalAmount += itemInfo.price * cartItems[items][item];
      }
    }
    return totalAmount;
  };

  // 🧮 Get subtotal amount
  const getSubtotal = () => {
    let subtotal = 0;
    for (const productId in cartItems) {
      const product = products.find((p) => p._id === productId);
      if (!product) continue;

      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          subtotal += product.price * cartItems[productId][size];
        }
      }
    }
    return subtotal;
  };

  // 💰 Get total amount (subtotal + delivery fee)
  const getTotal = () => {
    const subtotal = getSubtotal();
    return subtotal + delivery_fee;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    getSubtotal,
    getTotal,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
