const express = require("express");
const {
  createShop,
  activateUser,
  loginShop,
  getSeller,
  logout,
  getShop,
  updateShopPicture,
  updateSeller,
  getAllSellers,
  deleteSeller,
  updateSellerWithdraw,
  deleteSellerWithdrawMethods,
} = require("../controllers/shop");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const { upload } = require("../multer");

const router = express.Router();

// create shop
router.post("/create-shop", upload.single("file"), createShop);

// activate user
router.post("/activation", activateUser);

// login shop
router.post("/login-shop", loginShop);

// load shop
router.get("/getSeller", isSeller, getSeller);

// log out from shop
router.get("/logout", logout);

// get shop info
router.get("/get-shop-info/:id", getShop);

// update shop profile picture
router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"),
  updateShopPicture
);

// update seller info
router.put("/update-seller-info", isSeller, updateSeller);

// all sellers --- for admin
router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  getAllSellers
);

// delete seller ---admin
router.delete(
  "/delete-seller/:id",
  isAuthenticated,
  isAdmin("Admin"),
  deleteSeller
);

// update seller withdraw methods --- sellers
router.put("/update-payment-methods", isSeller, updateSellerWithdraw);

// delete seller withdraw methods --- only seller
router.delete(
  "/delete-withdraw-method/",
  isSeller,
  deleteSellerWithdrawMethods
);

module.exports = router;
