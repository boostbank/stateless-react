## Sample React App with Stateless

## Introduction

> Here is an example of how you would use stateless by itself in React.

## Code Samples

> 1. Install stateless in your React application.

```sh
npm i @boostbank/stateless --save
```

> 2. Create Events with any parameters

```jsx
export const id = "AddNameEvent";

export default function AddNameEvent(name) {
  return {
    id,
    payload: { name }
  };
}
```
```jsx
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

> 3. Add events to stateless

```jsx
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
// Index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CombineEvents from './events/CombineEvents';

// We will be looking into providing some functionality for you to add events at scale to reduce boilerplating.
CombineEvents();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
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