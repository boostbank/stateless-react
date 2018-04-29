import React, { Component } from "react";
import MockApi from "./MockApi";
import MockApiEvent from "./../events/MockApiEvent";
import { listen, ignore } from "@boostbank/stateless";
import uuid from "uuid/v1";

class MockApiComponent extends Component {
  constructor() {
    super();
    this.state = {
      uid: uuid(),
      loading: false,
      error: false,
      message: "",
      names: []
    };
  }

  componentDidMount() {
    listen(MockApiEvent().id, this.state.uid, event => {
      this.setState({
        loading: false,
        success: event.payload.success,
        error: event.payload.error,
        message: event.payload.message,
        names: [...event.payload.names]
      });
    });
  }

  componentWillUnmount() {
    ignore(MockApiEvent().id, this.state.uid);
  }

  render() {
    let content = "No data to show.";

    if (this.state.loading) {
      content = "Loading...";
    } else if (this.state.error) {
      content = this.state.message;
    } else if (this.state.success) {
      content = (
        <ul>
          {this.state.names.map(name => {
            return <li key={uuid()}>{name}</li>;
          })}
        </ul>
      );
    }

    return (
      <div>
        <button
          onClick={() => {
            this.setState({
              loading: true,
              message: "",
              error: false,
              success: false
            });
            MockApi();
          }}
        >
          Load Names
        </button>
        <br />
        <br />
        {content}
      </div>
    );
  }
}

export default MockApiComponent;
