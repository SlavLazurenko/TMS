import React, { useState, useEffect } from "react";
import "../css/SearchEvent.css";
import {ReactComponent as EventDateIcon} from "../img/event-date.svg";
import {useHistory} from "react-router-dom";
import axios from "../axiosConfig.js"
// import eventDateIcon from "../img/event-date.svg";
import {ReactComponent as ParticipantsIcon} from "../img/participants-count.svg";
import {ReactComponent as DurationIcon} from "../img/duration.svg";
import {ReactComponent as DisciplineIcon} from "../img/discipline.svg";


function Search() {

  const [state, setState] = useState({eventName: ""});

  const handleChange = event => {
    const {name, value} = event.target;
    setState({...state, [name]: value});
  }

  const handleSubmit = event => {
    console.log(`searching events: ${state.eventName}`);
    event.preventDefault(); 
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="header-search">
        <span className="visually-hidden">Search blog posts</span>
      </label>
      <input
        type="text"
        id="header-search"
        placeholder="Search events"
        name="eventName"
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}

function Create() {

  const history = useHistory();

  const handleRoute = () => {
    
    history.push("/event-registration");
    
  }

  return (



    <button
      className="create-event"
      onClick={() => {handleRoute()
      }}
    >
      Create Event +
    </button>
  );
}

function ParticipantsInfo(props) {
  let quantifier = props.count; 
  let qualifier = "";

  if (props.type === "SinglePlay")
    qualifier = "players";
  else if (props.type === "TeamPlay")
    qualifier = "teams";
  return (<span>{quantifier} {qualifier}</span>);
}

function DurationInfo(props) {
  let [quantifier, qualifier] = ["", ""];

  if (props.value / 1000 / 60 / 60 / 24 >= 1)
    [quantifier, qualifier] = [(props.value / 1000 / 60 / 60 / 24).toString(), "days"];
  else if (props.value / 1000 / 60 / 60 >= 1)
    [quantifier, qualifier] = [(props.value / 1000 / 60 / 60).toString(), "hours"];
  else if (props.value / 1000 / 60 >= 1)
    [quantifier, qualifier] = [(props.value / 1000 / 60).toString(), "minutes"];
  else
    [quantifier, qualifier] = [(props.value / 1000).toString(), "seconds"];
  return (<span>{Math.floor(quantifier)} {qualifier}</span>);
}

function EventEntry(props) {

  const { data } = props;
  const history = useHistory();

  return (
    <div
      className="event" 
      id={data.id} 
      style={{ 
        backgroundImage: `url(${data.logo})`
      }}
      onClick={() => {
        history.push(`/event/${data.id}`);  //GO TO EVENT PAGE
      }}
    >
      <div className="wrapper">
        <h3 className="name">{data.name}</h3>
        <ul className="info">
          <li className="time">
            <EventDateIcon />
            {/* <img src={eventDateIcon} alt="event date"></img> */}
            <span>{new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' }).format(data.start)}</span>
          </li>
          <li className="participants">
            <ParticipantsIcon />
            <ParticipantsInfo
              type={data.participant}
              count={data.maxParticipants}
            />
          </li>
          <li className="duration">
            <DurationIcon />
            <DurationInfo
              value={data.end - data.start}
            />
          </li>
          <li className="discipline">
            <DisciplineIcon />
            <span>{data.discipline}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Events(props) {

  // const location = useLocation();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // console.log('location', location.key);
    axios.get(`/get-events`)
    .then(res => {
      setEvents(res.data);
    })
    .catch(err => {
      console.log("Error", err);
    });
  }, []);

  return (
    <div className="events">
      <div className="header">
        <Search />
        <Create />
      </div>
      <div className="entries">
        {events.map(event => (
          <EventEntry 
            key={event.id}
            data={event}
          />
        ))}
      </div>
    </div>
  );
}

export default Events;
