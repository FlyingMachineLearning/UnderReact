
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/FollowersGrowthDashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <FollowersGrowthDashboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;
