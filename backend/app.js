const express = require("express");

const placeRouter = require("./routes/placeRoute");
const userRouter = require("./routes/userRoute");
const HttpError = require("./models/httpError");

const app = express();

app.use(express.json());

// CORS middlerware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); 

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow specific HTTP methods

  next();
});

app.use("/api/places", placeRouter);
app.use("/api/users", userRouter);

app.use((req, res, next) => {
  throw new HttpError("Could not find this route.", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500).json({
    message: error.message || "An unknown error occured!",
  });
});

module.exports = app;
