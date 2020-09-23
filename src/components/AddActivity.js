import React, { PureComponent } from "react";

class AddActivity extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    // console.log("handleSubmit, State:", this.state);
    this.props.addActivity(this.state);
    this.setState({
      //clear the form
      name: ""
    });
  };

  handleChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  render() {
    return (
      <div className="addActivity">
        <form onSubmit={this.handleSubmit}>
          <label>Add a project: </label>
          {/* turn this into a button later ^^^ */}
          <input
            type="text"
            name="Task"
            //will need value key here, lines up with this.state.content
            value={this.state.name}
  
            onChange={this.handleChange}
          ></input>
        </form>
      </div>
    );
  }
}

export default AddActivity;
