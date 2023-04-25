const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/httpError");
const User = require("../models/user");

exports.getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed. Please check your data", 422)
    );
  }

  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Sign up failed. Please try again later", 500);
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError(
      "User already exist. Please login instead.",
      422
    );
    return next(error);
  }

  const newUser = new User({
    name,
    email,
    image: "https://randomuser.me/api/portraits/men/16.jpg",
    password,
    places,
  });

  try {
    const createdUser = await User.create(newUser);
    res.status(201).json({
      message: "Success",
      data: {
        user: createdUser.toObject({ getters: true }),
      },
    });
  } catch (err) {
    const error = new HttpError(`Sign up failed. Please try again later.`, 500);
    return next(error);
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Sign up failed. Please try again later", 500);
    return next(error);
  }
  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Invalid credentials. Could not login.", 401);
    return next(error);
  }

  res.status(200).json({
    message: "Logged in successfully.",
  });
};
