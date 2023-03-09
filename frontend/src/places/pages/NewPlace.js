import { Link } from "react-router-dom";
const NewPlace = () => {
  return (
    <div>
      <h2>Hello from NewPlace</h2>
      <Link to={"/users"}>
        <button>To Users</button>
      </Link>
    </div>
  );
};

export default NewPlace;
