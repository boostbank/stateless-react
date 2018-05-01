## Sample React App with Stateless

## Introduction

> Here is an example of how you would use stateless by itself in React.

## Code Samples

> 1.  Install stateless in your React application.

```sh
npm i @boostbank/stateless --save
```

> 2.  Create Events with any parameters

```jsx
// events/AddNameEvent.js
export const id = "AddNameEvent";

export default function AddNameEvent(name) {
  return {
    id,
    payload: { name }
  };
}
```

```jsx
// events/MockApiEvent.js
const id = "MockApiEvent";

export default function MockApiEvent(success, error, message, names) {
  return {
    id,
    payload: {
      success,
      error,
      names,
      message
    }
  };
}
```

> 3.  Add events to stateless

```jsx
// events/CombineEvents.js
import AddNameEvent from "./AddNameEvent";
import AddNameErrorEvent from "./AddNameErrorEvent";
import MockApiEvent from "./MockApiEvent";
import { addEvent } from "@boostbank/stateless/lib/stateless";
export default function combineEvents() {
  addEvent(AddNameEvent().id);
  addEvent(AddNameErrorEvent().id);
  addEvent(MockApiEvent().id);
}
```

```jsx
// index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import CombineEvents from "./events/CombineEvents";

// We will be looking into providing some functionality for you to add events at scale to reduce boilerplating.
CombineEvents();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
```

> 4.  Listen

```jsx
// components/SimpleListenerComponent.jsx
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
```

> 5.  Dispatch events.

```jsx
// components/SimpleEventerComponent.jsx
import React from "react";
import { dispatch } from "@boostbank/stateless";
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
```

## Api Mocking Example

> MockApi

```jsx
// components/MockApi.js
import { dispatch } from "@boostbank/stateless/lib/stateless";
import MockApiEvent from "./../events/MockApiEvent";

const mockNamesFromApi = ["Wilber", "Nelson", "Grace", "Serena", "Loxus"];

export default function MockApi() {
  setTimeout(() => {
    if (Math.random() > 0.6) {
      dispatch(
        MockApiEvent(
          false,
          true,
          "Server had an error! (Not really its a 40% fail rate in code (Try again))",
          []
        )
      );
    } else {
      dispatch(MockApiEvent(true, false, "OK", mockNamesFromApi));
    }
  }, 2000);
}
```

> MockApi Component

```jsx
// components/MockApiComponent.jsx
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
```

## Try the example

> Clone the repo

> Install the dependencies

```sh
npm install
```

> Run the React app

```sh
npm start
```

> Enjoy! :)
