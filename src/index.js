import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);

// Registering the service worker to work offline
serviceWorker.register();