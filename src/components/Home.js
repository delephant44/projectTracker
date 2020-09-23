import React, { Component } from "react";
import Navbar from "./Navbar";
import Activity from "./Activity";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: [
      ]
    };
  }

  //every time we are reading from the localStorage, we are adding back to the state
  //this makes sure what's stored is not lost even if we refresh page
  componentDidMount = () => {
    const receivedActivities = localStorage.getItem("activities");
    if (receivedActivities) {
      const parsedJSON = JSON.parse(receivedActivities);
      this.setState({
        activities: parsedJSON
      });
    }
  };

  //good place to add items to local storage since component is updating
  componentDidUpdate = (prevProps, prevState) => {
    const activities = this.state.activities;
    if (prevState.activities.length !== this.state.activities.length) {
      const json = JSON.stringify(activities);
      localStorage.setItem("activities", json);
      console.log("saved, ", localStorage.getItem("activities"));
    };
  };

  addActivity = newActivity => {
    const newList = [...this.state.activities, newActivity];
    this.setState({
      activities: newList
    });
  };

  deleteActivity = id => {
    const newList = this.state.activities.filter(currentActivity => {
      return currentActivity.id !== id;
    });
    console.log(`Activity number ${id} was deleted`);
    this.setState({
      activities: newList
    });
  };

  render() {
    // const storedActivities = this.state.activities;
    // const json = JSON.stringify(storedActivities);
    // localStorage.setItem("activities", json);
    return (
      <div>
        <Navbar addActivity={this.addActivity} />
        <Activity
          activities={this.state.activities}
          deleteActivity={this.deleteActivity}
        />
      </div>
    );
  }
}

export default Home;
