import React, { Component } from 'react';
import './App.css';
import Map from './components/Map.js';
import FoursquareAPI from './components/FoursquareAPI.js';
import ListView from './components/ListView';

class App extends Component {

  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 13,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  closeMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers, markers)});
  };

  handleClick = (marker) => {
    this.closeMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)});
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    
    FoursquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
        this.setState({venues: Object.assign(this.state.venues, newVenue)});
      console.log(newVenue);
    });
  };

  handleListClick = (venue) => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleClick(marker);
  };

  componentDidMount(){
    FoursquareAPI.search({
      near: "Nilgiris, India",
      query: "museum"
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({venues, center, markers});
    });
  }
  render() {
    return (
      <div className="App">
        <Map {...this.state} handleClick = {this.handleClick} />
        <ListView {...this.state} handleListClick={this.handleListClick} />
      </div>
    );
  }
}

export default App;