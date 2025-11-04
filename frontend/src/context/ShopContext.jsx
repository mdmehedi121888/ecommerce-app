import React, { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 35;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ✅ Fetch user cart from backend
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error.message);
      toast.error("Failed to load cart.");
    }
  };

  // ✅ Add item to cart (local + backend)
  const addToCart = async (itemId, size) => {
    try {
      let cartData = structuredClone(cartItems);

      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        } else {
          cartData[itemId][size] = 1;
        }
      } else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
      }

      setCartItems(cartData);

      if (token) {
        const response = await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      toast.error("Failed to add item to cart.");
    }
  };

  // ✅ Update item quantity in cart
  const updateQuantity = async (itemId, size, quantity) => {
    try {
      let cartData = structuredClone(cartItems);
      if (!cartData[itemId]) return;
      cartData[itemId][size] = quantity;
      setCartItems(cartData);

      if (token) {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      }
    } catch (error) {
      console.error("Error updating cart:", error.message);
      toast.error("Failed to update cart.");
    }
  };

  // ✅ Count total items in cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        totalCount += cartItems[productId][size];
      }
    }
    return totalCount;
  };

  // ✅ Calculate subtotal of cart
  const getSubtotal = () => {
    let subtotal = 0;
    for (const productId in cartItems) {
      const product = products.find((p) => p._id === productId);
      if (!product) continue;
      for (const size in cartItems[productId]) {
        subtotal += product.price * cartItems[productId][size];
      }
    }
    return subtotal;
  };

  // ✅ Calculate total with delivery fee
  const getTotal = () => {
    const subtotal = getSubtotal();
    return subtotal + delivery_fee;
  };

  // ✅ Fetch all products
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.message || []);
      } else {
        toast.error("⚠️ Failed to fetch products!");
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
      toast.error("Failed to fetch products.");
    }
  };

  // ✅ Load token and cart when app starts
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
    }
  }, []);

  // ✅ Fetch products once on mount
  useEffect(() => {
    getProductsData();
  }, [backendUrl]);

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
    getSubtotal,
    getTotal,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
