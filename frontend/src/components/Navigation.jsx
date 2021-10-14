import React from "react";
import { Link, withRouter } from "react-router-dom";
import '../css/Navigation.css';

function Navigation(props) {
  return (
    <div className="navigation">
      <nav className="navbar">
        <ul className="links">
          <li className={`link ${ props.location.pathname === "/" ? "active" : "" }`}>
            <Link to="/">
              <span>Home</span>
            </Link>
          </li>
          <li className={`link ${ props.location.pathname === "/events" ? "active" : "" }`}>
            <Link to="/events">
              <span>Events</span>
            </Link>
          </li>
          <li className={`link ${ props.location.pathname === "/profile" ? "active" : "" }`}>
            <Link to="/profile">
              <span>Profile</span>
            </Link>
          </li>
          <li className={`link ${ props.location.pathname === "/login" ? "active" : "" }`}>
            <Link to="/login">
              <span>Login</span>
            </Link>
          </li>

        </ul>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);