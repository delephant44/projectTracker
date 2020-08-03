import React, { Component } from "react";
// import "./App.css";

class Stopwatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timerOn: false,
      timerTime: 0,
      timerStart: 0
    };
  }

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
    this.setState({
      timerOn: false
    });
    clearInterval(this.timer); //needed to clear the setInterval we called
  };

  resetTimer = () => {
    this.setState({
      timerTime: 0,
      timerStart: 0
    });
  };

  render() {
    const { timerTime } = this.state; //this.state.timerTime = timerTime
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    //concat a 0 and displaying only 2 digits by slicing off the rest
    return (
      <div className="stopwatchDisplay">
        {hours} : {minutes} : {seconds}
        {this.state.timerOn === false && this.state.timerTime === 0 && (
          <button onClick={this.startTimer}>Start</button>
        )}
        {this.state.timerOn === true && (
          <button onClick={this.stopTimer}>Stop</button>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <button onClick={this.startTimer}>Resume</button>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <button onClick={this.resetTimer}>Reset</button>
        )}
      </div>
    );
  }
}

export default Stopwatch;
