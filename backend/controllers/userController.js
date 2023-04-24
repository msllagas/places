const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/httpError");
const User = require("../models/user");

const TEMP_USERS = [
  {
    id: "u1",
    name: "Mandy Llagas",
    email: "test@test.com",
    password: "mypass123",
  },
];

exports.getUsers = (req, res, next) => {
  res.status(200).json({
    data: TEMP_USERS,
  });
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
    const error = new HttpError(
      `Sign up failed. Please try again later.`,
      500
    );
    return next(error);
  }
};
exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = TEMP_USERS.find((u) => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      401
    );
  }
  res.status(200).json({
    message: "Logged in successfully.",
  });
};
