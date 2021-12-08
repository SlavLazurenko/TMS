import React, { useEffect, useState } from "react";
import SingleElimination from "./Bracket";
import { useParams } from "react-router-dom";
import "../css/Event.css";

import { w3cwebsocket } from "websocket";

require('dotenv').config();

function Event(props) {
  const { id } = useParams();
  const { username } = props;

  const [client, setClient] = useState(null);
  // const [reconnect, setReconnect] = useState(false);
  const [eventData, setEventData] = useState({});
  const [rounds, setRounds] = useState([]);
  const [currentMatchId, setCurrentMatchId] = useState('0');

  const connect = (eventId) => {
    return new w3cwebsocket(`ws://${process.env.REACT_APP_PROXY_ADDRESS}/ws/event/${eventId}`, 'echo-protocol');
  }

  const resolveServerMessage = (msg) => {
    switch (msg.action) {
      case 'set-event': {
        if (msg.data) {
          setEventData(msg.data);
          if (msg.data.status !== 'pending') {
            setRounds(generateBracket(msg.data));
          }
        }
        break;
      }
      default:
        if (msg.error) {
          alert(`ERROR: ${msg.error}`);
        }
        else if (msg.message) {
          alert(msg.message);
        }
    }
    if (msg.action === 'set-event') {

    }
    else if (msg.action === 'create-matches') {

    }
  }

  const selectMatch = (matchId) => {
    setCurrentMatchId("" + matchId);
  }

  useEffect(() => {


    const connection = connect(id);
    connection.onopen = function () {
      console.log("Event ws connection established");
    }
    connection.onclose = function () {
      console.log("Event ws closed");
      alert("Connection lost, please reload the page");
    }
    connection.onmessage = function (e) {
      const msg = JSON.parse(e.data);
      console.log(msg);
      resolveServerMessage(msg);
    }
    setClient(connection);

    // return () => {
    //   client.close();
    // }

  }, [id]);

  if (eventData && eventData.status === "pending") {
    return (
      <div className="event-page">
        <EventInfoHeader eventData={eventData} />
        <h1 className="message">Event hasn't started yet</h1>
        {username && username === eventData.admin &&
          <button className="create" onClick={() => {
            client.send(JSON.stringify({
              action: 'create-matches'
            }));
          }}>
            Start Event
          </button>
        }

        {(() => {
          if (!username || (username !== eventData.admin && !eventData.participants.includes(username))) {
            return (
              <button className="participate" onClick={() => {
                if (username != null) {
                  client.send(JSON.stringify({
                    action: 'participate'
                  }));
                }
                else {
                  alert("Unregistered users cannot participate in events. Please, register your account.")
                }
              }}>
                Participate
              </button>
            );
          }
          else if (eventData.participants.includes(username)) {
            return (
              <h2 className="participant-message">You are participating</h2>
            );
          }
        })()}
      </div>
    );
  }
  else if (eventData && eventData.matches && eventData.matches.length > 0) {
    return (
      <div className="event-page">

        <EventInfoHeader eventData={eventData} />

        <div className="bracket-container">
          <SingleElimination rounds={rounds} />
        </div>

        {username &&
          <MatchResultForm
            eventId={id}
            matchId={currentMatchId}
            matches={eventData.matches}
            client={client}
          />
        }

        <div className="match-container">
          <MatchList
            matches={eventData.matches}
            currentMatch={currentMatchId}
            selectMatch={selectMatch}
            username={username}
            eventAdmin={eventData.admin}
          />
        </div>

      </div>
    );
  }
  else {
    return (
      <div className="event-page">
        <h1 className="message">Oops, something went wrong...</h1>
      </div>
    );
  }

}

function EventInfoHeader(props) {
  const { eventData } = props;
  if (eventData.id > 0) {
    return (
      <div className="event-info">
        <h1 className="event-name">{eventData.name}</h1>
        <div className="info-section admin">
          <h3 className="title">Admin</h3>
          <div className="data">{eventData.admin}</div>
        </div>
        <div className="info-section discipline">
          <h3 className="title">Game</h3>
          <div className="data">{eventData.discipline}</div>
        </div>
        <div className="info-section description">
          <h3 className="title">Description</h3>
          <div className="data">{eventData.description}</div>
        </div>
        <div className="info-section participants">
          <h3 className="title">Participants</h3>
          <div className="data">{eventData.participants.length}/{eventData.maxParticipants}</div>
        </div>
      </div>
    );
  }
  else {
    return null;
  }
}

function MatchResultForm(props) {

  const { eventId, matches, client, matchId } = props;

  const initialForm = {
    // matchid: matchId,
    res1: "",
    res2: ""
  }

  const [result, setResult] = useState(initialForm);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setResult({ ...result, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      eventid: parseInt(eventId),
      matchid: parseInt(matchId),
    };
    for (const field in result) {
      data[field] = parseInt(result[field]);
    }
    client.send(JSON.stringify({
      action: 'submit-result',
      data: data
    }));
  }

  useEffect(() => {
    setResult({
      res1: "",
      res2: ""
    })
  }, [matchId]);

  if (matchId < 1) {
    return null;
  }

  return (
    <div className="event-container">
      <div className="match-result-form">
        <p className="match-result-form-title">Match {matchId}</p>
        <p className="match-result-form-competitors">{matches[matchId - 1].competitors[0] || "N/A"} vs {matches[matchId - 1].competitors[1] || "N/A"}</p>
        <form onSubmit={handleSubmit}>
          {/* <div className="pad-match">
            <label className="match-result-form-text" htmlFor="matchid">  Match ID  </label>
            <input
              className="match-result-form-result-field"
              id="matchid"
              name="matchid"
              type="number"
              value={result.matchid}
              onChange={handleInputChange}
            />
          </div>
          <br/> */}
          <div className="player-container">
            <div className="player1-container">
              <input
                className="match-result-form-result-field"
                id="res1"
                name="res1"
                type="number"
                value={result.res1}
                onChange={handleInputChange}
              />
            </div>
            <p className="match-result-form-title pad-text"> : </p>
            <div className="player2-container">
              <input
                className="match-result-form-result-field"
                id="res2"
                name="res2"
                type="number"
                value={result.res2}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <br />
          <input
            className="match-result-form-submit"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
}

function MatchList(props) {
  const { matches, currentMatch, selectMatch, eventAdmin, username } = props;
  return (
    <div className="match-list">
      <table cellSpacing="0">
        <thead>
          <tr>
            <td>Match</td>
            <td>Result</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => {
            return (
              <MatchEntry
                {...match}
                key={index}
                currentMatch={currentMatch}
                selectMatch={selectMatch}
                username={username}
                eventAdmin={eventAdmin}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );

}

function MatchEntry(props) {
  const { id, status, competitors, result, username, eventAdmin, selectMatch, currentMatch } = props;

  function Competitor(props) {
    const { username } = props;
    if (typeof username === 'string' || username instanceof String) {
      return <span className="competitor">{username}</span>;
    }
    else {
      return <span className="competitor none">N/A</span>;
    }

  }

  if (competitors.length > 0) {
    return (
      <tr className={`match-entry ${parseInt(currentMatch) === id ? 'selected' : ''}`} onClick={() => {
        if (competitors.includes(username) || username === eventAdmin)
          selectMatch(id);
        else
          selectMatch(-1);
      }}>
        <td className="match">
          <Competitor username={competitors[0]} />
          <span className="versus">vs</span>
          <Competitor username={competitors[1]} />
        </td>
        {(() => {
          if (result && result[0] != null && result[1] != null) {
            return (
              <td className="result">
                <span className="digit">{result[0] === null ? '-' : result[0]}</span>
                <span className="colon">:</span>
                <span className="digit">{result[1] === null ? '-' : result[1]}</span>
              </td>
            );
          } else {
            return (
              <td className="result">
                -
              </td>
            );
          }
        })()}

        <td className="status">
          {(() => {
            // scheduled, inProgress, conflict, completed
            if (status === "scheduled") {
              return <span className="box scheduled">Scheduled</span>
            }
            else if (status === "inProgress") {
              return <span className="box playing">Playing</span>
            }
            else if (status === "pending") {
              return <span className="box pending">Pending</span>
            }
            else if (status === "conflict") {
              return <span className="box conflict">Conflict</span>
            }
            else if (status === "completed") {
              return <span className="box completed">Completed</span>
            }
            return status
          })()}
        </td>
      </tr>
    );
  }
  else {
    return (null);
  }

}

function generateBracket(event) {
  const numStartMatches = event.participants.length / 2;
  const minMatches = Math.pow(2, Math.ceil(Math.log(numStartMatches) / Math.log(2)));

  let brackets = [];

  let currentIndex = 0;
  for (let i = minMatches; i >= 1; i /= 2) {
    let title;
    switch (i) {
      case 4:
        title = "Quarterfinal";
        break;
      case 2:
        title = "Semifinal";
        break;
      case 1:
        title = "Final";
        break;
      default:
        title = `Round of ${i}`;
    }
    const round = {
      title: title,
      seeds: []
    }
    for (let j = 0; j < i; j++) {
      round.seeds.push({
        id: event.matches[currentIndex].id,
        teams: [
          { name: event.matches[currentIndex].competitors[0], score: event.matches[currentIndex].result[0] },
          { name: event.matches[currentIndex].competitors[1], score: event.matches[currentIndex].result[1] },
        ],
        date: `${currentIndex + 1}`
      });
      currentIndex++;
    }
    brackets.push(round);

  }

  return brackets;
}

export default Event;