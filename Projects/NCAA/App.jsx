import React from 'react';
import './App.css';

// Game component represents a single match-up
const Game = ({ team1, team2 }) => {
  return (
    <div className="game">
      <div className="team">{team1.name}</div>
      <div className="team">{team2.name}</div>
    </div>
  );
};

// Round component represents a single round of games
const Round = ({ games }) => {
  return (
    <div className="round">
      {games.map((game, index) => (
        <Game key={index} team1={game[0]} team2={game[1]} />
      ))}
    </div>
  );
};

// App component is the root of the application
const App = () => {
  // Simplified example data for the first round
  const firstRoundGames = [
    [{ name: 'Team 1' }, { name: 'Team 16' }],
    [{ name: 'Team 8' }, { name: 'Team 9' }],
    // Add more teams as needed
  ];

  return (
    <div className="app">
      <h1>NCAA Bracket Demo</h1>
      <Round games={firstRoundGames} />
      {/* Extend with more rounds here */}
    </div>
  );
};

export default App;
