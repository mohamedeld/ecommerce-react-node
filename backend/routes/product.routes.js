const express = require("express");
const {
  createProduct,
  getAllShopProducts,
  deleteShopProduct,
  getAllProducts,
  reviewProduct,
  getAllAdminProducts,
} = require("../controllers/product");
const { upload } = require("../multer");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");

const router = express.Router();

// create product
router.post("/create-product", upload.array("images"), createProduct);

// get all products of a shop
router.get("/get-all-products-shop/:id", getAllShopProducts);

// delete product of a shop
router.delete("/delete-shop-product/:id", isSeller, deleteShopProduct);

// get all products
router.get("/get-all-products", getAllProducts);

// review for a product
router.put("/create-new-review", isAuthenticated, reviewProduct);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  getAllAdminProducts
);

module.exports = router;
