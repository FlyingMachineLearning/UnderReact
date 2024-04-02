import React, { useState } from 'react';

const DashIframe = ({ src, year, height, width }) => {
  // Append the selected year as a URL parameter
  const urlWithYear = `${src}?year=${year}`;

  return (
    <iframe
      src={urlWithYear}
      height={height}
      width={width}
      style={{ border: 'none' }}
      title="Cicada Visualization"
    ></iframe>
  );
};

export default function App() {
  const [selectedYear, setSelectedYear] = useState(2024); // Default year

  return (
    <div className="App">
      <h1>Cicada Emergence Dashboard</h1>
      <label>
        Select Year:
        <input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        />
      </label>
      <DashIframe
        src="http://localhost:8050" // Replace with your Dash app URL
        year={selectedYear}
        height="600px"
        width="100%"
      />
    </div>
  );
}
