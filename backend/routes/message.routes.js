const express = require("express");
const {
  createMessage,
  getConversationMessages,
} = require("../controllers/message");
const { upload } = require("../multer");

const router = express.Router();

// create new message
router.post("/create-new-message", upload.single("images"), createMessage);

// get all messages with conversation id
router.get("/get-all-messages/:id", getConversationMessages);




module.exports = router;
