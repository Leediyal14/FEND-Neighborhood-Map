import React, { Component } from 'react';
import './App.css';
import Map from './components/Map.js';
import FoursquareAPI from './components/FoursquareAPI.js';

class App extends Component {

  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12
    }
  }

  closeMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers, markers)});
  }

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
      console.log(results.response.venues)
    });
  }
  render() {
    return (
      <div className="App">
        <Map {...this.state}
        handleClick = {this.handleClick}/>
      </div>
    );
  }
}

export default App;