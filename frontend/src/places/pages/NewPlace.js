import Input from "../../shared/components/FormElements/Input";
import "./Newplace.css";

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input
      id="title"
        element="input"
        type="text"
        label="Title"
        validators={[]}
        errorText="Please enter a valid title."
      />
    </form>
  );
};

export default NewPlace;
