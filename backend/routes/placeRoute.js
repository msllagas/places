const express = require("express");
const placeController = require("../controllers/placeController");

const router = express.Router();

router
  .route("/:pid")
  .get(placeController.getPlaceById)
  .patch(placeController.updatePlace)
  .delete(placeController.deletePlace);

router.route("/user/:uid").get(placeController.getPlaceByUserId);

router.route("/").post(placeController.createPlace);


module.exports = router;
