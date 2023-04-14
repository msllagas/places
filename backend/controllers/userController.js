const { v4: uuidv4 } = require("uuid");

const httpError = require("../models/httpError");
const HttpError = require("../models/httpError");

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
exports.signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = TEMP_USERS.find((u) => u.email === email);

  if (hasUser) {
    throw new HttpError("Could not create user, email already exists.", 422);
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };
  TEMP_USERS.push(newUser);
  res.status(201).json({
    data: newUser,
  });
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
