import React from "react";
import "../css/Events.css";

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
    id: 1,
    name: "Event #2",
    start: new Date(2021, 9, 24, 14),
    end: new Date(2021, 9, 24, 16),
    type: "Single Elimination",
    participantType: "team",
    maxParticipants: 8,
    discipline: "World of Tanks"
  },
  {
    id: 1,
    name: "Event #3",
    start: new Date(2021, 10, 5, 17),
    end: new Date(2021, 10, 12, 17),
    type: "Round Robin",
    participantType: "team",
    maxParticipants: 12,
    discipline: "Soccer"
  },
  {
    id: 1,
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
      <ol>
        {events.map(event => (
          <li>{event.name}</li>
        ))}
      </ol>
    </div>
  );
}

export default Events;