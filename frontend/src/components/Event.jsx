import React, { useState } from "react";
import axios from "../axiosConfig.js";
import SingleElimination from "./Bracket";
import { useParams } from "react-router-dom";


function Event(props) {

  const { id } = useParams();
  
  // const [eventData, setEventData] = useState({});

  const [rounds, setRounds] = useState([]);


  return (
    <div>
      <button onClick={() => {
        axios.get(`http://localhost:3001/createMatches/${id}`)
        .then(res => {
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
          setRounds(generateBracket(res.data))
        })
        .catch(err => {
          // alert(err.response.data)
          console.log(err)
        })
          
      }}>Get Bracket</button>
      <SingleElimination rounds={rounds}/>
    </div>
  );
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
          { name: event.matches[currentIndex].competitors[0] },
          { name: event.matches[currentIndex].competitors[1] },
        ]
      });
      currentIndex++;
    }
    brackets.push(round);
    
  }

  return brackets;
}

export default Event;