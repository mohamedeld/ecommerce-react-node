const mongoose = require("mongoose");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = mongoose.model("Shop");
const Event = mongoose.model("Event");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

module.exports.createEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid!", 400));
    } else {
      const files = req.files;
      const imageUrls = files.map((file) => `${file.filename}`);

      const eventData = req.body;
      eventData.images = imageUrls;
      eventData.shop = shop;

      const product = await Event.create(eventData);

      res.status(201).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

module.exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

module.exports.getAllShopEvents = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find({ shopId: req.params.id });

    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

module.exports.deleteShopEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = req.params.id;

    const eventData = await Event.findById(productId);

    eventData.images.forEach((imageUrl) => {
      const filename = imageUrl;
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });

    const event = await Event.findByIdAndDelete(productId);

    if (!event) {
      return next(new ErrorHandler("Event not found with this id!", 500));
    }

    res.status(201).json({
      success: true,
      message: "Event Deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

module.exports.getAllAdminEvents = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
