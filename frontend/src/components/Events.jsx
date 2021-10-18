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

function Events() {

  return (
    <div className="events">
      <div className="header">
        <Search />
        <Create />
      </div>
      <ol>

      </ol>
    </div>
  );
}

export default Events;