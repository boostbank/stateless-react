import React from "react";
import uuid from "uuid/v1";
import { listen, ignore } from "@boostbank/stateless";
import AddNameEvent from "./../events/AddNameEvent";
import AddNameErrorEvent from "./../events/AddNameErrorEvent";

export default class SimpleListenerComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      names: []
    };
    this.onNameAdd = this.onNameAdd.bind(this);
  }

  onNameAdd(event) {
    const newNames = [...this.state.names];
    newNames.push(event.payload.name);
    this.setState({
      names: newNames
    });
  }

  componentDidMount() {
    listen(AddNameEvent().id, this, this.onNameAdd);
    listen(AddNameErrorEvent().id, this, event => {
      alert(event.payload.error);
    });
  }

  componentWillUnmount() {
    ignore(AddNameEvent().id, this);
    ignore(AddNameErrorEvent().id, this);
  }

  render() {
    let content = null;

    if (this.state.names.length > 0) {
      content = (
        <ul>
          {this.state.names.map(name => {
            return <li key={uuid()}>{name}</li>;
          })}
        </ul>
      );
    }

    return content;
  }
}
