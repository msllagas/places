import { Link } from "react-router-dom";

import Card from "../UIElements/Card";
import "./Redirect.css";

const Redirect = (props) => {
  return (
    <div className="redirect">
      <Card>
        <h2>Page does not exist!</h2>
        <Link to={"/"}>
          <p>Return to YourPlaces.com</p>
        </Link>
      </Card>
    </div>
  );
};

export default Redirect;
