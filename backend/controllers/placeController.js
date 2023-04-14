const { v4: uuidv4 } = require('uuid');
const HttpError = require("../models/httpError");

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

exports.getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = TEMP_PLACES.find((p) => p.id === placeId);

  if (!place) {
    throw new HttpError("Could not find a place for the provided id!", 404);
  }
  res.status(200).json({
    message: "Success/Place",
    data: {
      place,
    },
  });
};

exports.getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = TEMP_PLACES.find((p) => p.creator === userId);
  if (!place) {
    return next(
      new HttpError("Could not find a user for the provided id!", 404)
    );
  }
  res.status(200).json({
    message: "Success/User",
    data: {
      place,
    },
  });
};

exports.createPlace = (req, res, next) => {
  const { title, description, location, address, creator } = req.body;

  const newPlace = {
    id: uuidv4(),
    title,
    description,
    location,
    address,
    creator,
  };

  TEMP_PLACES.push(newPlace);
  
  res.status(201).json({
    message: "Success",
    data: {
        place: newPlace
    },
  });
};
