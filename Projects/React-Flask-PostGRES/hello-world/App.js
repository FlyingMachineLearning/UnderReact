import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetch('/api/greeting')
      .then(response => response.json())
      .then(data => setGreeting(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{greeting}</p>
      </header>
    </div>
  );
}

export default App;
