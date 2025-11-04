import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// 🛒 Add to Cart
const addToCart = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.json({
        success: false,
        message: "Unauthorized: Token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userId = decoded.id;

    const { itemId, size } = req.body;

    if (!itemId || !size) {
      return res.json({ success: false, message: "Missing itemId or size" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    // Initialize item object if it doesn't exist
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // Increment quantity or set new
    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart successfully" });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// 🧺 Update Cart Item Quantity
const updateCart = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.json({
        success: false,
        message: "Unauthorized: Token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    const { itemId, size, quantity } = req.body;

    if (!itemId || !size || quantity === undefined) {
      return res.json({
        success: false,
        message: "Missing itemId, size, or quantity",
      });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.error("Update Cart Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// 📦 Get User Cart
const getUserCart = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.json({
        success: false,
        message: "Unauthorized: Token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Get User Cart Error:", error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
