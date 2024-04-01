import React from 'react';
import './Bracket.css'; // Assuming you have an accompanying CSS file for styling

// Game component
const Game = ({ team1, team2 }) => {
  return (
    <div className="game">
      <div className="team">{team1}</div>
      <div className="team">{team2}</div>
    </div>
  );
};

// Round component
const Round = ({ games }) => {
  return (
    <div className="round">
      {games.map((game, index) => (
        <Game key={index} team1={game.team1} team2={game.team2} />
      ))}
    </div>
  );
};

// Bracket component (simplified for one round)
const Bracket = () => {
  // Example games data for one round
  const games = [
    { team1: 'Team 1', team2: 'Team 2' },
    { team1: 'Team 3', team2: 'Team 4' },
    // Add more games as needed
  ];

  return (
    <div className="bracket">
      <Round games={games} />
      {/* Add more rounds as needed */}
    </div>
  );
};

export default Bracket;
