const express = require("express");

const router = express.Router();

const TEMP_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "Famous Building",
    location: {
      lat: 40.74,
      lng: -73,
    },
    address: "New York, NY",
    creator: "u1",
  },
];

router.route("/:pid").get((req, res, next) => {
  const placeId = req.params.pid;
  const place = TEMP_PLACES.find((p) => p.id === placeId);
  res.status(200).json({
    message: "Success/Place",
    data: {
      place,
    },
  });
});
router.route("/user/:uid").get(
  (req, res, next) => {
    const userId = req.params.uid;
    const place = TEMP_PLACES.find((p) => p.creator === userId);
    res.status(200).json({
      message: "Success/User",
      data: {
        place,
      },
    });
  });

module.exports = router;
