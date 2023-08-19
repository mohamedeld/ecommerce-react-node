const express = require("express");
const {
  createOrder,
  getUserOrders,
  getSellerOrders,
  updateSellerOrder,
  giveRefund,
  acceptRefund,
  getAdminOrders,
} = require("../controllers/order");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");

const router = express.Router();

// create new order
router.post("/create-order", createOrder);

// get all orders of user
router.get("/get-all-orders/:userId", getUserOrders);

// get all orders of seller
router.get("/get-seller-all-orders/:shopId", getSellerOrders);

// update order status for seller
router.put("/update-order-status/:id", isSeller, updateSellerOrder);

// give a refund ----- user
router.put("/order-refund/:id", giveRefund);

// accept the refund ---- seller
router.put(
  "/order-refund-success/:id",
  isSeller,
acceptRefund
);

// all orders --- for admin
router.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdmin("Admin"),
getAdminOrders
);

module.exports = router;
