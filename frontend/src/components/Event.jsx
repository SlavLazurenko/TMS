import React from "react";
import SingleElimination from "./Bracket";


function Event(props) {

  const eventData = {
    id: 1,
    name: 'SUPER WOT',
    admin: 'sagepages',
    description: 'This event is for absolute savages.',
    start: '2021-11-29T17:48',
    end: '2021-12-09T17:48',
    accessibility: 'Public',
    type: 'SingleElimination',
    participant: 'TeamPlay',
    discipline: 'World of Tanks',
    maxParticipants: 12,
    logo: '/img/event-images/kwienhlls2f9i1ghl09.jpg',
    participants: [ 'sagepages', 'slav', 'luffy', 'bigboy', 'dudu', '111' ],
    matches: [
      {
        id: 1,
        competitors: [ 'sagepages', 'bigboy' ],
        result: [ null, null ]
      },
      { id: 2, competitors: [ 'dudu', 'slav' ], result: [ null, null ] },
      { id: 3, competitors: [ '111' ], result: [ null, null ] },
      { id: 4, competitors: [ 'luffy' ], result: [ null, null ] },
      { id: 5, competitors: [], result: [ null, null ] },
      { id: 6, competitors: [], result: [ null, null ] },
      { id: 7, competitors: [], result: [ null, null ] }
    ]
  }

  const rounds = generateBracket(eventData);




  return (
    <div>
      <SingleElimination/>
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
    }
    brackets.push(round);
  }

  return brackets;
}

export default Event;