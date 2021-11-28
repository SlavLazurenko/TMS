import React from "react";
import SingleElimination from "./Bracket";

function Event(props) {

  const rounds = [
    {
      title: 'Round 1',
      seeds: [
        {},
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [
            { id: 1, name: 'The Leons', score: 2 },
            // { id: 3, name: 'Kitties', score: 6 },
          ],
        },
        {},
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [
            { id: 1, name: 'The Leons', score: 2 },
            // { id: 3, name: 'Kitties', score: 6 },
          ],
        },
      ],
    },
    {
      title: 'Round 2',
      seeds: [...new Array(2)].fill({
        id: 1,
        date: new Date().toDateString(),
        teams: [
          { id: 1, name: 'The Leons', score: 2 },
          { id: 3, name: 'Kitties', score: 9 },
        ],
      }),
    },
    {
      title: 'Round 3',
      seeds: [...new Array(1)].fill({
        id: 1,
        date: new Date().toDateString(),
        teams: [
          { id: 1, name: 'The Leons', score: 2 },
          { id: 3, name: 'Kitties', score: 6 },
        ],
      }),
    },
  ];

  return (
    <SingleElimination rounds={rounds} />
  );
}

export default Event;