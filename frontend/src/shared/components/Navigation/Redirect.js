import { Link } from "react-router-dom";

import './Redirect.css'

const Redirect = props => {
return <div className="redirect">
    <h2>Page does not exist!</h2>
    <Link to={'/'}>
        <p>Return to YourPlaces.com</p>
    </Link>
</div>
};

export default Redirect;