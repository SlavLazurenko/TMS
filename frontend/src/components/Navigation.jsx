import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <ul>
            <li>
              <Link to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/events">
                Events
              </Link>
            </li>
            <li>
              <Link to="/profile">
                Profile
              </Link>
            </li>
        </ul>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);