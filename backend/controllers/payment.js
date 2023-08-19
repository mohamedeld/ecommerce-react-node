const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.stripeMethod = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: {
      company: "amazon-team",
    },
  });
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

module.exports.getStripeKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
});
