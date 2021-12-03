import React, { useState } from "react";
import axios from "../axiosConfig.js";
import SingleElimination from "./Bracket";
import { useParams } from "react-router-dom";
import "../css/Event.css";

// const defaultEvent = {
//   id: 1,
//   name: 'SUPER WOT',
//   admin: 'sagepages',
//   description: 'This event is for absolute savages.',
//   start: '2021-11-29T17:48',
//   end: '2021-12-09T17:48',
//   accessibility: 'Public',
//   type: 'SingleElimination',
//   participant: 'TeamPlay',
//   discipline: 'World of Tanks',
//   maxParticipants: 12,
//   logo: '/img/event-images/kwienhlls2f9i1ghl09.jpg',
//   participants: [ 'sagepages', 'slav', 'luffy', 'bigboy', 'dudu', '111' ],
//   matches: [
//     { id: 1, status: "conflict", competitors: [ 'sagepages', 'bigboy' ], result: [ null, null ] },
//     { id: 2, status: "inProgress", competitors: [ 'dudu', 'slav' ], result: [ null, null ] },
//     { id: 3, status: "completed", competitors: [ '111' ], result: [ 3, 0 ] },
//     { id: 4, status: "completed", competitors: [ 'luffy' ], result: [ 3, 0 ] },
//     { id: 5, status: "scheduled", competitors: [], result: [ null, null ] },
//     { id: 6, status: "scheduled", competitors: [], result: [ null, null ] },
//     { id: 7, status: "scheduled", competitors: [], result: [ null, null ] }
//   ]
// };


function Event(props) {

  const { id } = useParams();
  
  const [eventData, setEventData] = useState({});
  const [rounds, setRounds] = useState([]);

  return (
    <div className="event">
      <button onClick={() => {
        axios.get(`http://localhost:3001/createMatches/${id}`)
        .then(res => {
          setEventData(res.data);
          setRounds(generateBracket(res.data));
          console.log(res.data)
          alert("Match is now in progress.")
          // setEventData(res.data);
        })
        .catch(err => {
          // alert(err.respone.data)
          console.log(err)
        });
      }}>
        Create Bracket
      </button>
      <button onClick={() => {
        axios.get(`http://localhost:3001/getEvent/${id}`)
        .then(res => {
          setEventData(res.data);
          setRounds(generateBracket(res.data))
        })
        .catch(err => {
          // alert(err.response.data)
          console.log(err)
        })
          
      }}>Get Bracket</button>

      { eventData && eventData.matches &&
        <div className="match-container">
        <MatchList matches={eventData.matches} />
        </div>
      }
      { rounds &&
        <div className="bracket-container">
          <SingleElimination rounds={rounds}/>
        </div>
      
      } 
      
      
      <MatchResultForm eventId={id} />
      
      
      
    </div>
  );
}

function MatchResultForm(props) {

  const {eventId} = props;

  const initialForm = {
    matchid: "1",
    res1: "",
    res2: ""
  }

  const [result, setResult] = useState(initialForm);

  const handleInputChange = event => {
    const {name, value} = event.target;
    setResult({...result, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {eventid: parseInt(eventId)};
    for (const field in result) {
      data[field] = parseInt(result[field]);
    }
    console.log(data);
    axios.post('http://localhost:3001/submitResults', data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="event-container">
      <div className="match-result-form">
        <p className="match-result-form-title">Player 1 vs. Player 2</p>
        <form onSubmit={handleSubmit}>
          <div className="pad-match">
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
          <br/>
          <div className="player-container">
            <div className="player1-container">
              <label className="match-result-form-text" htmlFor="res1">Player 1 </label>
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
              <label className="match-result-form-text" htmlFor="res2"> Player 2 </label>
            </div>
          </div>
          <br/>
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
  const {matches} = props;
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
            <MatchEntry {...match} key={index} />
          );
        })}
        </tbody>
      </table>
    </div>
  );

}

function MatchEntry(props) {
  const { status, competitors, result } = props;

  if (competitors.length > 0) {
    return (
      <tr className="match-entry">
        <td className="match">
          <span className="competitor">{competitors[0]}</span>
          <span className="versus">vs</span> 
          <span className="competitor">{competitors[1] || 'N/A'}</span>
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
        ]
      });
      currentIndex++;
    }
    brackets.push(round);
    
  }

  return brackets;
}

export default Event;