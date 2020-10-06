import React from 'react';
import './App.css';
// import addActivity from './components/activity';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <h1 className="App-header">
        Project Tracker
      </h1>
      <div className="mainIcon">
          <img src="/project.png" alt="project tracker" />
      </div>
      <Home/>
      1) left off at stopwatch component
      <br></br>
      2) am able to add thisTime to the state when stopping the clock
      <br></br>
      3) looks like console log is showing the previous time on the state
    </div>
  );
}

export default App;

//make another larger component that has navbar and activity
//state moves to the new larger, that parent component is doing all the master work, state, changes, add, remove, stopwatch
//parent tells children

//stopwatch can stay as its own since it falls under each activity