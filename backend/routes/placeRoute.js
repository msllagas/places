const express = require("express");
const placeController = require("../controllers/placeController");

const router = express.Router();

router.route("/:pid").get(placeController.getPlaceById);

router.route("/user/:uid").get(placeController.getPlaceByUserId);

module.exports = router;
