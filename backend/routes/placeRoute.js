const express = require("express");

const router = express.Router();

router.route('/').get((req, res, next) => {
  console.log("GET Request in Places");
  res.status(200).json({
    message: "Success",
  });
});

module.exports = router;
