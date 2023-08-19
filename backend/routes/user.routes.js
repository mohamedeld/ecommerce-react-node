const express = require("express");
const {
  createUser,
  activateUser,
  loginUser,
  getUser,
  logout,
  updateUser,
  updateUserAvatar,
  updateUserAddress,
  deleteUserAddress,
  updateUserPassword,
  userInfo,
  getAllUsers,
  deleteUser,
} = require("../controllers/user");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const { upload } = require("../multer");

const router = express.Router();

// User register
router.post("/create-user", upload.single("file"), createUser);

// activate user
router.post("/activation", activateUser);

// login user
router.post("/login-user", loginUser);

// load user
router.get("/getuser", isAuthenticated, getUser);

// log out user
router.get("/logout", logout);

// update user info
router.put("/update-user-info", isAuthenticated, updateUser);

// update user avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  updateUserAvatar
);

// update user addresses
router.put("/update-user-addresses", isAuthenticated, updateUserAddress);

// delete user address
router.delete("/delete-user-address/:id", isAuthenticated, deleteUserAddress);

// update user password
router.put("/update-user-password", isAuthenticated, updateUserPassword);

// find user information with the userId
router.get("/user-info/:id", userInfo);

// all users --- for admin
router.get("/admin-all-users", isAuthenticated, isAdmin("Admin"), getAllUsers);

// delete users --- admin
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin("Admin"),
  deleteUser
);

module.exports = router;
