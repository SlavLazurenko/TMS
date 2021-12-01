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
          <li className={`link ${ props.location.pathname === "/search-event" ? "active" : "" }`}>
            <Link to="/search-event">
              <span>Events</span>
            </Link>
          </li>

          { props.username &&   //LOGGED IN
          <li className={`link ${ props.location.pathname.includes("/profile") ? "active" : "" }`}>
            <Link to={`/profile/${props.username}`}>
              <span>Profile</span>
            </Link>
          </li>
          }

          { !props.username &&  //NOT LOGGED IN
          <li className={`link ${ props.location.pathname === "/login" ? "active" : "" }`}>
            <Link to="/login">
              <span>Login</span>
            </Link>
          </li>
          }

          { !props.username &&  //NOT LOGGED IN
          <li className={`link ${ props.location.pathname === "/signup" ? "active" : "" }`}>
            <Link to="/signup">
              <span>SignUp</span>
            </Link>
          </li>
          }
          
          { props.username &&   //LOGGED IN
          <li className={`link ${ props.location.pathname === "/logout" ? "active" : "" }`}>
          <Link to="/">
            <span onClick={() => {
              props.unsetAccount();
              props.history.push("/");
            }}>Logout</span>
          </Link>
          </li>
          }

        </ul>
      </nav>
    </div>
  );
  
}

export default withRouter(Navigation);