import express from "express";
import adminAuth from "./../middleware/adminAuth.js";
import {
  allOrders,
  placeOrder,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyStripe,
} from "../controllers/orderController.js";
import authUser from "./../middleware/auth.js";

const orderRouter = express.Router();

//admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//payment features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/place/stripe", authUser, placeOrderStripe);

// user feature
orderRouter.post("/userorders", authUser, userOrders);

//verify payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
