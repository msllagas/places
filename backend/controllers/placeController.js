const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/httpError");

let TEMP_PLACES = [
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

exports.getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = TEMP_PLACES.filter((p) => p.creator === userId);
  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a user for the provided id!", 404)
    );
  }
  res.status(200).json({
    message: "Success/User",
    data: {
      place: places,
    },
  });
};

exports.createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

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
      place: newPlace,
    },
  });
};

exports.updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = TEMP_PLACES.find((p) => p.id === placeId);
  const placeIndex = TEMP_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  TEMP_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({
    message: "Success",
    data: {
      place: updatedPlace,
    },
  });
};
exports.deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  TEMP_PLACES = TEMP_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({
    message: "Successfully deleted place.",
  });
};
