const express = require("express");
const { check } = require("express-validator");


const userController = require("../controllers/userController");

const router = express.Router();

router.route("/").get(userController.getUsers);

router
  .route("/signup")
  .post(
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
    userController.signup
  );
router.route("/login").post(userController.login);

module.exports = router;
