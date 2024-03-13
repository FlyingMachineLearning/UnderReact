import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [segments, setSegments] = useState([]);
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10); // Set for 1 minute

  const handleButtonClick = (color) => {
    if (timer) clearInterval(timer);
    if (timeLeft <= 0) return; // Exit if timer has expired

    const newTimer = setInterval(() => {
      setSegments((prevSegments) => {
        const totalAngle = prevSegments.reduce((acc, curr) => acc + curr.angle, 0);
        if (totalAngle >= 360) {
          clearInterval(newTimer); // Stop if pie is complete
          return prevSegments;
        }

        const lastSegment = prevSegments[prevSegments.length - 1];
        if (lastSegment && lastSegment.color === color) {
          return [...prevSegments.slice(0, -1), { ...lastSegment, angle: lastSegment.angle + 1 }];
        } else {
          return [...prevSegments, { color, angle: 1 }];
        }
      });

      setTimeLeft((prevTimeLeft) => {
        const newTimeLeft = prevTimeLeft - 0.1;
        if (newTimeLeft <= 0) {
          clearInterval(newTimer);
          return 0;
        }
        return newTimeLeft;
      });
    }, 100);

    setTimer(newTimer);
  };

  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset?')) {
      if (timer) clearInterval(timer);
      setSegments([]);
      setTimeLeft(60); // Reset timer to 60 seconds
      setTimer(null);
    }
  };

  const drawSegments = () => {
    let startAngle = 0;
    return segments.map((segment, index) => {
      const { color, angle } = segment;
      const largeArcFlag = angle > 180 ? 1 : 0;
      const endX = Math.cos(2 * Math.PI * (startAngle + angle) / 360 - Math.PI / 2);
      const endY = Math.sin(2 * Math.PI * (startAngle + angle) / 360 - Math.PI / 2);
      const path = `M 0 0 L ${Math.cos(2 * Math.PI * startAngle / 360 - Math.PI / 2)} ${Math.sin(2 * Math.PI * startAngle / 360 - Math.PI / 2)} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
      
      startAngle += angle;

      return <path key={index} d={path} fill={color} />;
    });
  };

  return (
    <div className="App">
      <svg className="circle" viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }}>
        {drawSegments()}
      </svg>
      <div className="controls">
        <button onClick={() => handleButtonClick('green')} style={{ backgroundColor: 'green', color: 'white', margin: '10px' }}>Green</button>
        <button onClick={() => handleButtonClick('blue')} style={{ backgroundColor: 'blue', color: 'white', margin: '10px' }}>Blue</button>
      </div>
      <div className="timer">
        Time left: {Math.floor(timeLeft / 60)}:{(Math.floor(timeLeft) % 60).toString().padStart(2, '0')}
      </div>
      <button onClick={handleReset} style={{ marginTop: '10px' }}>Reset</button>
    </div>
  );
};

export default App;




/*import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [segments, setSegments] = useState([]); // Store segments as { color, angle }
  const [timer, setTimer] = useState(null);

  // Function to handle button clicks
  const handleButtonClick = (color) => {
    if (timer) clearInterval(timer);

    const newTimer = setInterval(() => {
      setSegments((prevSegments) => {
        const lastSegment = prevSegments[prevSegments.length - 1];
        if (lastSegment && lastSegment.color === color) {
          // Increase the last segment's angle
          return [
            ...prevSegments.slice(0, -1),
            { ...lastSegment, angle: lastSegment.angle + 1 },
          ];
        } else {
          // Add a new segment
          return [...prevSegments, { color, angle: 1 }];
        }
      });
    }, 100);

    setTimer(newTimer);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  // Calculate SVG paths for segments
  const drawSegments = () => {
    let startAngle = 0;
    return segments.map((segment, index) => {
      const { color, angle } = segment;
      const largeArcFlag = angle > 180 ? 1 : 0;
      const endX = Math.cos(2 * Math.PI * (startAngle + angle) / 360 - Math.PI / 2);
      const endY = Math.sin(2 * Math.PI * (startAngle + angle) / 360 - Math.PI / 2);
      const path = `M 0 0 L ${Math.cos(2 * Math.PI * startAngle / 360 - Math.PI / 2)} ${Math.sin(2 * Math.PI * startAngle / 360 - Math.PI / 2)} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;

      startAngle += angle;

      return (
        <path key={index} d={path} fill={color} />
      );
    });
  };

  return (
    <div className="App">
      <svg className="circle" viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }}>
        {drawSegments()}
      </svg>
      <button onClick={() => handleButtonClick('green')}>Green</button>
      <button onClick={() => handleButtonClick('blue')}>Blue</button>
    </div>
  );
};

export default App;*/

/*import React, { useState, useEffect } from 'react';
import './App.css';



const defaultColors = ['red', 'orange', 'yellow', 'green', 'indigo', 'blue', 'violet', 'gray'];

const App = () => {
  const [participantCount, setParticipantCount] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [activeParticipantIndex, setActiveParticipantIndex] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);

const drawPieSegment = (participant, index) => {
  const totalDuration = participants.reduce((acc, curr) => acc + curr.time, 0);
  const startAngle = participants.slice(0, index).reduce((acc, curr) => acc + (curr.time / totalDuration) * 2 * Math.PI, 0) - Math.PI / 2;
  const endAngle = startAngle + (participant.time / totalDuration) * 2 * Math.PI;

  const largeArcFlag = participant.time / totalDuration > 0.5 ? 1 : 0;

  const startX = Math.cos(startAngle);
  const startY = Math.sin(startAngle);
  const endX = Math.cos(endAngle);
  const endY = Math.sin(endAngle);

  const d = `M 0 0 L ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;

  return (
    <path key={index} d={d} fill={participant.color} />
  );
};

  // Update participants based on the selected count
  useEffect(() => {
    const updatedParticipants = Array.from({ length: participantCount }, (_, index) => {
      return {
        name: participants[index]?.name || `Person ${index + 1}`,
        color: defaultColors[index % defaultColors.length],
        time: 0
      };
    });
    setParticipants(updatedParticipants);
  }, [participantCount]);

  // Handlers for start, pause, and reset
const handleStart = () => {
  if (!timerRunning && participantCount > 0) {
    if (activeParticipantIndex === null) setActiveParticipantIndex(0); // Default to first participant if none is active
    setTimerRunning(true);
    const interval = setInterval(() => {
      setParticipants((currentParticipants) => {
        const updatedParticipants = [...currentParticipants];
        if (activeParticipantIndex !== null) {
          updatedParticipants[activeParticipantIndex].time += 0.1; // Increment time by 0.1s
        }
        return updatedParticipants;
      });
    }, 100); // Update every 0.1 seconds

    // Save the interval ID so it can be cleared later
    setActiveTimer(interval);
  }
};

const handlePause = () => {
  clearInterval(activeTimer);
  setTimerRunning(false);
};

const handleReset = () => {
  if (window.confirm('Are you sure you want to reset?')) {
    clearInterval(activeTimer);
    setParticipants(participants.map(participant => ({ ...participant, time: 0 })));
    setActiveParticipantIndex(null);
    setTimerRunning(false);
  }
};

const [activeTimer, setActiveTimer] = useState(null);

  // Update participant name
  const updateParticipantName = (index, name) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].name = name;
    setParticipants(updatedParticipants);
  };

  // Render participant input fields
const renderParticipantInputs = () => participants.map((participant, index) => (
  <div key={index} className="participant-control">
    <input
      style={{ borderColor: participant.color }}
      value={participant.name}
      onChange={(e) => updateParticipantName(index, e.target.value)}
    />
    <button
      style={{ backgroundColor: participant.color }}
      onClick={() => setActiveParticipantIndex(index)}
    >
      {participant.name || `Person ${index + 1}`}
    </button>
  </div>
));

  return (
    <div className="App">
      <svg className="circle" viewBox="-1 -1 2 2">
  {participants.map((participant, index) => drawPieSegment(participant, index))}
</svg>
      <select value={participantCount} onChange={(e) => setParticipantCount(e.target.value)}>
        <option value={0}>Select Number of Participants</option>
        {[...Array(8).keys()].map(i => (
          <option key={i} value={i + 1}>{i + 1}</option>
        ))}
      </select>
      {renderParticipantInputs()}
      <div className="controls">
        <button onClick={handleStart} disabled={!participantCount || timerRunning}>Start</button>
        <button onClick={handlePause} disabled={!timerRunning}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;

*/

