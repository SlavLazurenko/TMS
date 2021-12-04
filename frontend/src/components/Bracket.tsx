import React from 'react';
import { Bracket, Seed, SeedItem, SeedTeam, SeedTime, RenderSeedProps } from 'react-brackets';

const RenderSeed = ({ breakpoint, seed }: RenderSeedProps) => {
  const score1 = seed.teams?.[0]?.score;
  const score2 = seed.teams?.[1]?.score;
  
  return (
    <Seed mobileBreakpoint={breakpoint}>
      <SeedItem style={{ width: '100%' }}>
        <div>
          <SeedTeam><span>{seed.teams?.[0].name || '-----------'}</span><span>{isNumber(score1) ? score1 : '-'}</span></SeedTeam>
          {/* <div style={{ height: 1, backgroundColor: '#707070' }}></div> */}
          <SeedTeam><span>{seed.teams?.[1]?.name || '-----------'}</span><span>{isNumber(score2) ? score2 : '-'}</span></SeedTeam>
        </div>
      </SeedItem>
      <SeedTime mobileBreakpoint={breakpoint} style={{ fontSize: 9 }}>
        {seed.date}
      </SeedTime>
    </Seed>
  );
};

const SingleElimination = (props: any) => {
  return (
    <Bracket
      mobileBreakpoint={767}
      rounds={props.rounds}
      renderSeedComponent={RenderSeed}
      swipeableProps={{ enableMouseEvents: true, animateHeight: true }}
    />
  );
};

function isNumber(value: string | number): boolean
{
  return (
    (value != null) &&
    (value !== '') &&
    !isNaN(Number(value.toString()))
  );
}

export default SingleElimination;
