const express = require("express");

const placeRouter = require("./routes/placeRoute");
const userRouter = require('./routes/userRoute');
const HttpError = require('./models/httpError');

const app = express();

app.use(express.json());

app.use("/api/places", placeRouter);
app.use('/api/users', userRouter);

app.use((req, res, next) => {
  throw new HttpError('Could not find this route.', 404);
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500).json({
    message: error.message || "An unknown error occured!",
  });
});

module.exports = app;
