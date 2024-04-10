import React, { useEffect, useState } from 'react';

const FollowersGrowthDashboard = () => {
  const [followersData, setFollowersData] = useState([]);
  const [growthRate, setGrowthRate] = useState(0);

  useEffect(() => {
    fetch('/api/followers-growth')
      .then(response => response.json())
      .then(data => {
        setFollowersData(data.data);
        setGrowthRate(data.growthRate);
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div>
      <h2>Followers Growth Dashboard</h2>
      <h4>Growth Rate: {growthRate.toFixed(2)}%</h4>
      <ul>
        {followersData.map((item, index) => (
          <li key={index}>{item.date}: {item.followers} followers</li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersGrowthDashboard;
