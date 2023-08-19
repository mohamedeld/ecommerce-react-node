const express = require("express");
const {
  createWithdraw,
  getAllWithdraws,
  updateWithdraws,
} = require("../controllers/withdraw");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();

// create withdraw request --- only for seller
router.post("/create-withdraw-request", isSeller, createWithdraw);

// get all withdraws --- admin
router.get(
  "/get-all-withdraw-request",
  isAuthenticated,
  isAdmin("Admin"),
  getAllWithdraws
);

// update withdraw request ---- admin
router.put(
  "/update-withdraw-request/:id",
  isAuthenticated,
  isAdmin("Admin"),
  updateWithdraws
);

module.exports = router;
