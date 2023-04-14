const express = require("express");
const { check } = require("express-validator");

const placeController = require("../controllers/placeController");

const router = express.Router();

router
  .route("/:pid")
  .get(placeController.getPlaceById)
  .patch(
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    placeController.updatePlace
  )
  .delete(placeController.deletePlace);

router.route("/user/:uid").get(placeController.getPlacesByUserId);

router.route('/').post(
  check("title").not().isEmpty(),
  check("description").isLength({ min: 5 }),
  check("address").not().isEmpty(),
  placeController.createPlace
);
module.exports = router;
