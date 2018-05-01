import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SimpleEventerComponent from "./components/SimpleEventerComponent";
import SimpleListenerComponent from "./components/SimpleListenerComponent";
import MockApiComponent from './components/MockApiComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Stateless with React</h1>
          <code>We know it isn't pretty.</code>
        </header>
        <div className="App-intro">
          <h2>Sample communication between components</h2>
          <SimpleEventerComponent />
          <SimpleListenerComponent />
        </div>
        <h2>Mock Api Example</h2>
        <MockApiComponent/>
      </div>
    );
  }
}

export default App;
