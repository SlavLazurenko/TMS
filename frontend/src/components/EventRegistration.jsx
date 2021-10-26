import React, { useState } from "react";
import "../css/EventRegistration.css";
import { useDropzone } from "react-dropzone";


function Dropzone(props){

  const {getRootProps, getInputProps, acceptedFiles} = useDropzone({noDrag: true});
  const files = acceptedFiles.map(file => <p key={file.path}> {file.path}</p>);

  return(

    <section className="container">
      <div {...getRootProps({className: "dropzone"})}>
        <div className="logo-image"></div>
          <input {...getInputProps()}/>
      </div>
      <aside>
        <p className="file-identifier">File:{files}</p>
      </aside>
    </section>
  )
}



const EventRegistration = props => {

  const initialEventState = {

    eventName: "",
    importFile: null,
    description: "",
    accessibilityOption: null,
    bracketOption: null,
    numOfParticipants: null,
    startDate: "",
    endDate: ""

  }

  const [eventData, setEventData] = useState(initialEventState);

  const handleInputChange = event => {

    const{name, value} = event.target;
    setEventData({...eventData, [name]:value});
  }

  const eventregistration = () => {

    props.eventregistration(eventData);
    props.history.push("/");
  }



    return (
      <div className="container">
        <div className="header">
          <p className="header-text">Event Registration</p>
        </div>
        <form>
          <div className="event-left">
            <input 
            type="text"
            className="name-field registration-input"
            placeholder="Event Name"
            require value={eventData.eventName}
            onChange={handleInputChange}></input>
            <Dropzone
            require value={eventData.importFile}
            onChange={handleInputChange}
            ></Dropzone>
            <textarea 
            type="text"
            className="description-box"
            placeholder="Description"
            require value={eventData.description}
            onChange={handleInputChange}></textarea>

          </div>
          <div className="event-right">
            <select className="dropdown">
              <option selected value="0" className="dropdown-option">Accessibility</option>
              <option value="1" className="dropdown-option">Accessibility1</option>
              <option value="2" className="dropdown-option">Accessibility2</option>
              <option value="3" className="dropdown-option">Accessibility3</option>
            </select>
            <select className="dropdown">
              <option selected value="0" className="dropdown-option">Single Elimination</option>
              <option value="1" className="dropdown-option">Double Elimination</option>
              <option value="1" className="dropdown-option">Straight Round Robin</option>
              <option value="1" className="dropdown-option">Multilevel</option>
            </select>
            <input 
            type="number"
            className="participant-field number-field" 
            placeholder="Number of Participants"
            min="4"
            max="128"
            ></input>
            <p className="limit-mems">Min: 4 - Max: 128</p>
            <div classname="date-box">
              <div className="date-box-left">
                <p className="start-tag">Start Date</p>
                <input 
                type="datetime-local"
                className="date-field date-input"
                placeholder="Start Date"></input>
                <p className="start-tag">End Date</p>
                <input
                type="datetime-local"
                className="date-field date-input"
                placeholder="End Date"></input>
              </div>
            </div>
            <input 
            type="submit" 
            value="Create Event"
            className="submit-create-event"></input>
          </div>
        </form>
      </div>
    );
  }

  export default EventRegistration; 

