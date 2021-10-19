import React from "react";

function EventRegistration() {

    return (
      <div className="event-registration">
				<DropMenu />
			<input
        type="text"
        id="first-name"
        placeholder="Name"
        name="s"
      />  
				<input
        type="text"
        id="from"
        placeholder="From"
        name="s"
      />  
			<input
        type="text"
        id="to"
        placeholder="To"
        name="s"
      />  
				<input
        type="textarea"
        id="description"
        placeholder="Description"
        name="s"
      /> 
        <h3>Event Registration</h3>
      </div>
    );
  }

	function DropMenu() {
		return (
			<form action="/events" method="get">
						
				<select> Accesibility
					<option value="Private">Private</option>
					<option value="Public">Public</option>
					<option value="Invite only">Invite only</option>
				</select>
			</form>
		);
	}





export default EventRegistration; 