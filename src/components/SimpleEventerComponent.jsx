import React from "react";
import { dispatch } from "@boostbank/stateless/lib/stateless";
import AddNameEvent from "./../events/AddNameEvent";
import AddNameErrorEvent from "./../events/AddNameErrorEvent";

export default class SimpleEventerComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
    this.onNameChange = this.onNameChange.bind(this);
  }

  onNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={this.onNameChange}
        />
        <button
          onClick={() => {
            if (this.state.name.length > 0) {
              dispatch(AddNameEvent(this.state.name));
              this.setState({
                name: ""
              });
            } else {
              dispatch(AddNameErrorEvent("The name cannot be empty!"));
            }
          }}
        >
          Add Name
        </button>
      </div>
    );
  }
}
