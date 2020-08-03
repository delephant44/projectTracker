import React, { Component } from "react";
import Activity from "./activity"

class Navbar extends Component {
  
  // handleSubmit = event => {
  //   event.preventDefault(); //don't refresh page
  //   console.log("handleSubmit, State:", this.state);
  //   //need a function to actually submit the info in Tasks component
  //   this.props.addTask(this.state);
  //   this.setState({
  //     //clear the form
  //     content: ""
  //   });
  // };

  // editActivity = id => {};

  render() {
    return (
      <div className="navbar">
        <button>Edit</button>
        <button>Add</button>
      </div>
    );
  }
}

export default Navbar;
