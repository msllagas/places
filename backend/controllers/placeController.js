const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/httpError");
const getCoordinatesForAddress = require("../util/location");
const Place = require("../models/place");
const User = require("../models/user");
const mongoose = require("mongoose");

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

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      "Creating place failed. Please try again.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newPlace.save({ session: sess });
    user.places.push(newPlace);
    await user.save({ session: sess });
    sess.commitTransaction();

    res.status(201).json({
      message: "Success",
      data: {
        newPlace,
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

exports.updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findByIdAndUpdate(placeId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      message: "Successful update!",
      data: {
        place: place.toObject({ getters: true }),
      },
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not update place!",
      500
    );
    return next(error);
  }
};
exports.deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not delete place!",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError("Could not find place for this id.", 404);
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await Place.findByIdAndRemove(placeId, { session });
    place.creator.places.pull(place);
    await place.creator.save({session});
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      `Something went wrong, could not delete place. ${err}`,
      500
    );
    return next(error);
  }
  res.status(200).json({message: 'Deleted place successfully!'})
};
