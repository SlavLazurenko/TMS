import axios from "../axiosConfig.js";
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
        // console.log(file)            // ??? file contents
        // console.log(reader.result)   // raw data
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

    name: "",
    description: "",
    accessibility: "Public",
    type: "SingleElimination",
    participant: "SinglePlay",
    discipline: "",
    maxParticipants: "",
    start: "",
    end: ""

  }

  const [eventData, setEventData] = useState(initialEventState);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = event => {
  
    const{name, value} = event.target;
    setEventData({...eventData, [name]:value});
  
  }

  const eventregistration = () => {

    const form = new FormData()

    for(var key in eventData){
      form.append(key, eventData[key])
    }

    form.append("file", selectedFile)
    
    axios.post('http://localhost:3001/eventRegistration', form)
    .then(res => {
      console.log(`${res.status} ${res.statusText}: ${res.response}`)
      props.history.push("/");
    })
    .catch(e => {
      alert(e.response.data)
      console.log(`${e} ${e.response.data}`)
    
    })

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
            value={eventData.name}
            onChange={handleInputChange}
            name="name"></input>
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
            value={eventData.accessibility}
            onChange={handleInputChange}
            name="accessibility">
              <option value="Public" className="dropdown-option">Public</option>
              <option value="Private" className="dropdown-option">Private</option>
            </select>
            <select 
            className="dropdown"
            value={eventData.type}
            onChange={handleInputChange}
            name="type">
              <option value="SingleElimination" className="dropdown-option">Single Elimination</option>
              <option value="DoubleElimination" className="dropdown-option">Double Elimination</option>
              <option value="StraightRoundRobin" className="dropdown-option">Straight Round Robin</option>
              <option value="Multilevel" className="dropdown-option">Multilevel</option>
            </select>
            <select 
            className="dropdown"
            value={eventData.participant}
            onChange={handleInputChange}
            name="participant">
              <option value="SinglePlay" className="dropdown-option">Single Play</option>
              <option value="TeamPlay" className="dropdown-option">Team Play</option>
            </select>
            <input 
            type="text"
            className="name-field registration-input"
            placeholder="Name of Game"
            value={eventData.discipline}
            onChange={handleInputChange}
            name="discipline"></input>
            <input 
            type="number"
            className="participant-field number-field" 
            placeholder="Number of Participants"
            value={eventData.maxParticipants}
            onChange={handleInputChange}
            name="maxParticipants"
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
                value={eventData.start}
                onChange={handleInputChange}
                name="start"></input>
                <p className="start-tag">End Date</p>
                <input
                type="datetime-local"
                className="date-field date-input"
                placeholder="End Date"
                value={eventData.end}
                onChange={handleInputChange}
                name="end"></input>
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

