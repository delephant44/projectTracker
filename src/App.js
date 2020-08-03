import React from 'react';
import './App.css';
// import addActivity from './components/activity';
import Navbar from './components/navbar';
import Activity from './components/activity'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Stopwatch
      </header>
      <Navbar addActivity="addActivity"/>
      <Activity/>
    </div>
  );
}

export default App;
