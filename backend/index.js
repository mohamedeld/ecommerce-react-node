const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const compression = require('compression')
const securityProviderMW = require("./middleware/security-provider.mw");
const ErrorHandler = require("./middleware/error");
const routes = require("./routes");

// config

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

const app = express();
app.use("/", express.static(path.join(__dirname, "./uploads")));


app.use(compression());
app.use(securityProviderMW);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(routes);
app.use(ErrorHandler);
module.exports = app;
