const express = require("express");
const { stripeMethod, getStripeKey } = require("../controllers/payment");

const router = express.Router();

router.post("/process", stripeMethod);

router.get("/stripeapikey", getStripeKey);

module.exports = router;
