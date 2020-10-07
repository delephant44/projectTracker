import React, { Component } from "react";
import Stopwatch from "./Stopwatch";

class Activity extends Component {

  render() {
    //map through all the tasks here, will need to have ability to add and remove
    return (
      <div className="activityContainer">
        {this.props.activities.length ? (
          this.props.activities.map((currentActivity, index) => {
            currentActivity.id = index;
            return (
              <div key={index} className="activityRow">
                <div className="activityName">{currentActivity.name}</div>
                {/* pass index down as a prop (from the map method) */}
                <Stopwatch index={index}/>
                <div>
                  <button className="removeButton" onClick={() => this.props.deleteActivity(currentActivity.id)}>Delete</button>
                </div>
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
