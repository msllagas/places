const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/httpError");
const getCoordinatesForAddress = require("../util/location");
const Place = require("../models/place");

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

exports.getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
    if (!place) {
      throw new HttpError("Could not find a place for the provided id!", 404);
    }
    res.status(200).json({
      message: "Success/Place",
      data: {
        place: place.toObject({ getters: true }),
      },
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not find a place for specifed id.",
      500
    );
    return next(error);
  }
};

exports.getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;
  try {
    places = await Place.find({ creator: userId });
    if (!places || places.length === 0) {
      return next(
        new HttpError("Could not find a user for the provided id!", 404)
      );
    }
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed. Please try again later!",
      404
    );
    return next(error);
  }

  res.status(200).json({
    message: "Success/User",
    data: {
      places: places.map((place) => place.toObject({ getters: true })),
    },
  });
};

exports.createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordinatesForAddress(req.body.address);
  } catch (err) {
    return next(err);
  }

  const newPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cb/Jose_Rizal_National_Monument.jpg",
    creator,
  });

  try {
    const createdPlace = await Place.create(newPlace);
    res.status(201).json({
      message: "Success",
      data: {
        createdPlace,
      },
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not create a place.",
      500
    );
    return next(error);
  }
};

exports.updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

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

  if (!TEMP_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Could not find a place for that id.", 404);
  }

  TEMP_PLACES = TEMP_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({
    message: "Successfully deleted place.",
  });
};
