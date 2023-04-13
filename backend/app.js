const express = require("express");
const bodyParser = require("body-parser");

const placeRouter = require("./routes/placeRoute");

const app = express();

app.use(bodyParser.json());
// app.use(express.json());

app.use("/api/places", placeRouter);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500).json({
    message: error.message || "An unknown error occured!",
  });
});

module.exports = app;
