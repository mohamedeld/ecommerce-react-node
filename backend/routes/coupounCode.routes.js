const express = require("express");
const { isSeller } = require("../middleware/auth");
const {
  createCoupoun,
  getAllCoupouns,
  deleteCoupoun,
  getCoupounValue,
} = require("../controllers/coupounCode");

const router = express.Router();

// create coupoun code
router.post("/create-coupon-code", isSeller, createCoupoun);

// get all coupons of a shop
router.get("/get-coupon/:id", isSeller, getAllCoupouns);

// delete coupoun code of a shop
router.delete("/delete-coupon/:id", isSeller, deleteCoupoun);

// get coupon code value by its name
router.get("/get-coupon-value/:name", getCoupounValue);

module.exports = router;
