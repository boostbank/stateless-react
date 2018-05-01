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
