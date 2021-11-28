import React from "react";

import { Bracket, RoundProps } from 'react-brackets';

const rounds: RoundProps[] = [
  {
    title: 'Round one',
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team B' }],
      },
      {
        id: 2,
        date: new Date().toDateString(),
        teams: [{ name: 'Team C' }, { name: 'Team D' }],
      },
      {
        id: 3,
        date: new Date().toDateString(),
        teams: [{ name: 'Team E' }, { name: 'Team F' }],
      },
      {
        id: 4,
        date: new Date().toDateString(),
        teams: [{ name: 'Team H' }, { name: 'Team I' }],
      },
      {
        id: 5,
        date: new Date().toDateString(),
        teams: [{ name: 'Team J' }, { name: 'Team K' }],
      },
    ],
  },
  {
    title: 'Round two',
    seeds: [
      {
        id: 3,
        date: new Date().toDateString(),
        teams: [{ name: '' }, { name: '' }],
      },
    ],
  },
];

const Component = () => {
  return <Bracket rounds={rounds} />;
};


const Event: React.FC = () => {

  

  return (
    <div>
      <Component/>
    </div>
  );
}

export default Event;