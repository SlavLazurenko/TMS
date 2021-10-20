import React from "react";
import "../css/EventRegistration.css";

function EventRegistration() {

    return (
      <div className="container">
        <div className="header">
          <p className="header-text">Event Registration</p>
        </div>
        <form>
          <div className="event-container-left">
            <input 
            className="name-field" 
            type="text"></input>
          </div>
          <div className="event-container-right">
          </div>
        </form>
      </div>
    );
  }







export default EventRegistration; 

