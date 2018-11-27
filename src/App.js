import React, { Component } from 'react';
import './App.css';
import Map from './components/Map.js';
import FoursquareAPI from './components/FoursquareAPI.js';

class App extends Component {

  componentDidMount(){
    FoursquareAPI.search({
      near: "Nilgiris, India",
      query: "museum"
    }).then(results => {
      console.log(results.response.venues)
    });
  }
  render() {
    return (
      <div className="App">
        <Map />
      </div>
    );
  }
}

export default App;