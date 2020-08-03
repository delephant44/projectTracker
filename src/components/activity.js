import React, { Component } from "react";
import Stopwatch from "./stopwatch";

class Activity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: [
        { id: 1, name: "Project 1", time: 0 },
        { id: 2, name: "Project 2", time: 0 }
      ]
    };
  }

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
    //map through all the tasks here, will need to have ability to add and remove
    return (
      <div>
        {this.state.activities.length ? (
          this.state.activities.map(currentActivity => {
            return (
              <div className="activityRow">
                <div>{currentActivity.name}</div>
                <div>{currentActivity.time}</div>
                <Stopwatch />
              </div>
            );
          })
        ) : (
          <div>No Activities</div>
        )}
      </div>
      
    );
  }
}

export default Activity;
