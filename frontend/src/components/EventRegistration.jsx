import React, { useState, useRef } from "react";
import "../css/EventRegistration.css";

const Image = ({onFileSelect}) =>{

  const[imgData, setImgData] = useState(null)
  const fileInput = useRef(null)

  const onChangePic = event => {

    const file = event.target.files[0]
    if(file){
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      })
      reader.readAsDataURL(file);
    }

    onFileSelect(file);
  }

  return (
         
           <div 
            className="img-holder bckg-img" 
            onClick={() => {
            document.getElementById("event-logo").click() && fileInput.current && fileInput.current.click()}}
            >
              <img  
              src={imgData} 
              alt="" 
              id="img" 
              className="img" />
              <input  
              className="fileUploader fileNone" 
              type="file" 
              name="image-upload" 
              id="event-logo" 
              accept="image/*" 
              onChange={onChangePic}/> 
            </div>
        
  )
}



const EventRegistration = props => {

  const initialEventState = {

    eventName: "",
    description: "",
    accessibilityOption: null,
    bracketOption: null,
    numOfParticipants: null,
    startDate: "",
    endDate: ""

  }

  const [eventData, setEventData] = useState(initialEventState);
  const [selectedFile, setSelectedFile] = useState(null);

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
            value={eventData.eventName}
            onChange={handleInputChange}
            name="eventName"></input>
            <Image
            onFileSelect={(file) => setSelectedFile(file)}
            value={selectedFile}  // this line is here to prevent warning until axios is implemented
            />
            <textarea 
            type="text"
            className="description-box padd"
            placeholder="Description"
            value={eventData.description}
            onChange={handleInputChange}
            name="description"></textarea>

          </div>
          <div className="event-right">
            <select 
            className="dropdown"
            defaultValue=""
            value={eventData.accessibilityOption}
            onChange={handleInputChange}
            name="accessibilityOption">
              <option defaultValue="Public" className="dropdown-option">Public</option>
              <option value="Private" className="dropdown-option">Private</option>
            </select>
            <select 
            className="dropdown"
            defaultValue=""
            value={eventData.bracketOption}
            onChange={handleInputChange}
            name="bracketOption">
              <option defaultValue="SingleElimination" className="dropdown-option">Single Elimination</option>
              <option value="DoubleElimination" className="dropdown-option">Double Elimination</option>
              <option value="StraightRoundRobin" className="dropdown-option">Straight Round Robin</option>
              <option value="Multilevel" className="dropdown-option">Multilevel</option>
            </select>
            <input 
            type="number"
            className="participant-field number-field" 
            placeholder="Number of Participants"
            value={eventData.numOfParticipants}
            onChange={handleInputChange}
            name="numOfParticipants"
            min="4"
            max="128"
            ></input>
            <p className="limit-mems">Min: 4 - Max: 128</p>
            <div className="date-box">
              <div className="date-box-left">
                <p className="start-tag">Start Date</p>
                <input 
                type="datetime-local"
                className="date-field date-input"
                placeholder="Start Date"
                value={eventData.startDate}
                onChange={handleInputChange}
                name="startDate"></input>
                <p className="start-tag">End Date</p>
                <input
                type="datetime-local"
                className="date-field date-input"
                placeholder="End Date"
                value={eventData.endDate}
                onChange={handleInputChange}
                name="endDate"></input>
              </div>
            </div>
            <input 
            type="button" 
            value="Create Event"
            className="submit-create-event"
            onClick={eventregistration}></input>
          </div>
        </form>
      </div>
    );
  }

  export default EventRegistration; 

