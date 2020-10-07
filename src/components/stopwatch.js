import React, { Component } from "react";
// import "./App.css";

class Stopwatch extends Component {
  constructor(props) {
    super(props);

    const storedState = localStorage.getItem(`Stopwatch-${props.index}`);
    // debugger
    if (storedState) {
      this.state = JSON.parse(storedState); //converting it to object from a string
      //opposite as stringify etc
    } else {
      this.state = {
        timerOn: false,
        timerTime: 0,
        timerStart: 0
      };
    }
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
      activeTimers: thisTime
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
        activeTimers: parsedJSON
      });
    }
    // console.log("this.props in CDMount", this.props);
  };

  //psuedo code w Mike

  // activeTimers: []
  // data = JSON.parse(localStorage.getItem('activeTimers'))
  // [0]
  // [1]
  // [2]
  // pass an index through so that you can tell which timer you are altering
  // index === currentTimer
  // data[currentTimer] "00 : 00 : 09"
  // data[currentTimer] = thisTime;
  // localStorage.setItem("activeTimers", JSON.stringify(data))

  //good place to add items to local storage since component is updating
  componentDidUpdate = (prevProps, prevState) => {
    // const activeTimers = this.state.activeTimers;
    const stringify = JSON.stringify(this.state);
    localStorage.setItem(`Stopwatch-${this.props.index}`, stringify);

    // if (prevState.activeTimers !== this.state.activeTimers) {
    //   console.log(activeTimers)
    //   let data = JSON.parse(localStorage.getItem("activeTimers")); //removing string
    //   if (Array.isArray(localStorage.getItem("activeTimers"))) {
    //     data[currentTimerIndex] = activeTimers;
    //     // console.log(data[currentTimerIndex]);
    //     // console.log(activeTimers)
    //     localStorage.setItem("activeTimers", data);
    //   } else {
    //     localStorage.setItem("activeTimers", [activeTimers]);
    //   }
    // //   console.log(localStorage.getItem("activeTimers"))
    // //   // const json = JSON.stringify(activeTimers); //making it a string
    // //   // console.log("json", json)
    // //   // localStorage.setItem("currentTime", json);
    // //   // console.log(
    // //   //   "saved into localStorage (CDUpdate - STOPWATCH)",
    // //   //   localStorage.getItem("currentTime")
    // //   // );
    // }
  };

  renderActiveTimes = () => {
    return this.state.activeTimers;
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
        {/* {this.renderActiveTimes()} */}

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
