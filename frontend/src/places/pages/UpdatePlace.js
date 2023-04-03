import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validator";
import useForm from "../../shared/hooks/form-hooks";
import "./PlaceForm.css";

const TEMP_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "Famouse building",
    imageUrl:
      "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.2134,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "Famouse building",
    imageUrl:
      "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.2134,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  let { placeId } = useParams();
  const identifiedPlace = TEMP_PLACES.find((p) => p.id === placeId);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: identifiedPlace.title,
        isValid: true,
      },
      description: {
        value: identifiedPlace.description,
        isValid: true,
      },
    },
    true
  );

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  }

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }
  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (minimun of 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.value}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
