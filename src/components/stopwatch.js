import React, { Component } from "react";
// import "./App.css";

class Stopwatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timerOn: false,
      timerTime: 0,
      timerStart: 0,
      currentTime: []
    };
  }
//need to find a way to render the timers in order, just like activities, since they're in order


//Use objects instead of arrays for optimizations
  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      // the below line will set our start time either to when the timer was started, or what that time would have been if the timer is resumed. VVV
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  };

  stopTimer = () => {
    const { timerTime } = this.state; //this.state.timerTime = timerTime

    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    let thisTime = `${hours} : ${minutes} : ${seconds}`;

    this.setState({
      timerOn: false,
      currentTime: thisTime
    });
    console.log("state after stop", this.state);
    clearInterval(this.timer); //needed to clear the setInterval we called
  };

  resetTimer = () => {
    this.setState({
      timerTime: 0,
      timerStart: 0
    });
  };

  //every time we are reading from the localStorage, we are adding back to the state
  //this makes sure what's stored is not lost even if we refresh page
  componentDidMount = () => {
    const receivedTimers = localStorage.getItem("currentTime");
    if (receivedTimers) {
      const parsedJSON = JSON.parse(receivedTimers);
      this.setState({
        currentTime: parsedJSON
      });
    }
  };

  //good place to add items to local storage since component is updating
  componentDidUpdate = (prevProps, prevState) => {
    const currentTime = this.state.currentTime;
    if (prevState.currentTime !== this.state.currentTime) {
      const json = JSON.stringify(currentTime);
      localStorage.setItem("currentTime", json);
      console.log("saved into localStorage (CDUpdate - STOPWATCH)", localStorage.getItem("currentTime"));
    }
  };

  renderCurrentTime = () => {
    return this.state.currentTime;
  };

  render() {
    const { timerTime } = this.state; //this.state.timerTime = timerTime
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    //concat a 0 and displaying only 2 digits by slicing off the rest
    return (
      <div className="stopwatchContainer">
        <div className="stopwatch">
          {hours} : {minutes} : {seconds}
        </div>
        {this.renderCurrentTime()}

        {this.state.timerOn === false && this.state.timerTime === 0 && (
          <button className="startStopButtons" onClick={this.startTimer}>
            Start
          </button>
        )}

        {this.state.timerOn === true && (
          <button className="startStopButtons" onClick={this.stopTimer}>
            Stop
          </button>
        )}

        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <button className="startStopButtons" onClick={this.startTimer}>
            Resume
          </button>
        )}

        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <button className="resetButton" onClick={this.resetTimer}>
            Reset
          </button>
        )}
      </div>
    );
  }
}

export default Stopwatch;
