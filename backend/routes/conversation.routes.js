const express = require("express");
const { isSeller, isAuthenticated } = require("../middleware/auth");
const {
  createNewConversation,
  getSellerConversations,
  getUserConversations,
  updateLastMessage,
} = require("../controllers/conversation");
const router = express.Router();

// create a new conversation
router.post("/create-new-conversation", createNewConversation);

// get seller conversations
router.get(
  "/get-all-conversation-seller/:id",
  isSeller,
  getSellerConversations
);

// get user conversations
router.get(
  "/get-all-conversation-user/:id",
  isAuthenticated,
  getUserConversations
);

// update the last message
router.put("/update-last-message/:id", updateLastMessage);

module.exports = router;
