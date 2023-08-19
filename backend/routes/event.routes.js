const express = require("express");
const {
  createEvent,
  getAllEvents,
  deleteShopEvent,
  getAllShopEvents,
  getAllAdminEvents,
} = require("../controllers/event");
const { isAdmin, isAuthenticated } = require("../middleware/auth");
const { upload } = require("../multer");

const router = express.Router();

// create event
router.post("/create-event", upload.array("images"), createEvent);

// get all events
router.get("/get-all-events", getAllEvents);

// get all events of a shop
router.get("/get-all-events/:id", getAllShopEvents);

// delete event of a shop
router.delete("/delete-shop-event/:id", deleteShopEvent);

// all events --- for admin
router.get(
  "/admin-all-events",
  isAuthenticated,
  isAdmin("Admin"),
  getAllAdminEvents
);

module.exports = router;
