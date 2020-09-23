import React, { Component } from "react";
import AddActivity from "./AddActivity";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">

        <AddActivity addActivity={this.props.addActivity} />
      </div>
    );
  }
}

export default Navbar;
