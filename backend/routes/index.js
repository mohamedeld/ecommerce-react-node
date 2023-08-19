const express = require("express");
const router = express.Router();
require("../model");

// routes files path
const conversationRoutes = require("./conversation.routes");
const coupounCodeRoutes = require("./coupounCode.routes");
const eventRoutes = require("./event.routes");
const messageRoutes = require("./message.routes");
const orderRoutes = require("./order.routes");
const paymentRoutes = require("./payment.routes");
const productRoutes = require("./product.routes");
const shopRoutes = require("./shop.routes");
const userRoutes = require("./user.routes");
const withdrawRoutes = require("./withdraw.routes");

//add routes here
router.use("/api/v2/conversation", conversationRoutes);
router.use("/api/v2/coupon", coupounCodeRoutes);
router.use("/api/v2/event", eventRoutes);
router.use("/api/v2/message", messageRoutes);
router.use("/api/v2/order", orderRoutes);
router.use("/api/v2/payment", paymentRoutes);
router.use("/api/v2/product", productRoutes);
router.use("/api/v2/shop", shopRoutes);
router.use("/api/v2/user", userRoutes);
router.use("/api/v2/withdraw", withdrawRoutes);

module.exports = router;
