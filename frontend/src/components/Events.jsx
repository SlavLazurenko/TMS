import React from "react";
import "../css/Events.css";
import eventDateIcon from "../img/event-date.svg";
import participantsIcon from "../img/participants-count.svg";
import durationIcon from "../img/duration.svg";
import disciplineIcon from "../img/discipline.svg";

function Search() {
  return (
    <form action="/events" method="get">
      <label htmlFor="header-search">
        <span className="visually-hidden">Search blog posts</span>
      </label>
      <input
        type="text"
        id="header-search"
        placeholder="Search events"
        name="s"
      />
      <button type="submit">Search</button>
    </form>
  );
}

function Create() {
  return (
    <button className="create-event">Create Event +</button>
  );
}

function ParticipantsInfo(props) {
  let quantifier = props.count; 
  let qualifier = "";

  if (props.type === "player")
    qualifier = "players";
  else if (props.type === "team")
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

  return (
    <div className="event" id={data.id}>
      <h3 className="name">{data.name}</h3>
      <ul className="info">
        <li className="time">
          <img src={eventDateIcon} alt="event date"></img>
          <span>{new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' }).format(data.start)}</span>
        </li>
        <li className="participants">
          <img src={participantsIcon} alt="maximum participants"></img>
          <ParticipantsInfo
            type={data.participantType}
            count={data.maxParticipants}
          />
        </li>
        <li className="duration">
          <img src={durationIcon} alt="duration"></img>
          <DurationInfo
            value={data.end - data.start}
          />
        </li>
        <li className="discipline">
          <img src={disciplineIcon} alt="discipline"></img>
          <span>{data.discipline}</span>
        </li>
      </ul>
    </div>
  );
}

const tmpEvents = [
  {
    id: 1,
    name: "Event #1",
    start: new Date(2021, 9, 20, 18),
    end: new Date(2021, 9, 22, 18),
    type: "Double Elimination",
    participantType: "player",
    maxParticipants: 32,
    discipline: "DOTA 2"
  },
  {
    id: 2,
    name: "Event #2",
    start: new Date(2021, 9, 24, 14),
    end: new Date(2021, 9, 24, 16),
    type: "Single Elimination",
    participantType: "team",
    maxParticipants: 8,
    discipline: "World of Tanks"
  },
  {
    id: 3,
    name: "Event #3",
    start: new Date(2021, 10, 5, 17),
    end: new Date(2021, 10, 12, 17),
    type: "Round Robin",
    participantType: "team",
    maxParticipants: 12,
    discipline: "Soccer"
  },
  {
    id: 4,
    name: "Event #4",
    start: new Date(2021, 10, 12, 10),
    end: new Date(2021, 10, 12, 18),
    type: "Single Elimination",
    participantType: "player",
    maxParticipants: 24,
    discipline: "Basketball"
  }
];

function Events() {

  const events = tmpEvents;

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