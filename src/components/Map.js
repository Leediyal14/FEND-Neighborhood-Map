import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import markerIcon from './pointer.png';

const MyMapComponent = withScriptjs(withGoogleMap((props =>
    
    // Creating Markers and InfoWindows based on venues
    <GoogleMap
        defaultZoom={8}
        zoom={props.zoom}
        defaultCenter={{ lat: 11.402730, lng: 76.696693 }}
    >
        {props.markers && 
            props.markers.filter(marker => marker.isVisible)
            .map((marker, index, arr) => {
                const venueInfo = props.venues.find(venue => venue.id ===marker.id);
            return (
                <Marker 
                    key={index} 
                    icon={markerIcon}
                    animation={arr.length === 1 ? window.google.maps.Animation.BOUNCE : window.google.maps.Animation.DROP}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => props.handleClick(marker)}
                >

                {marker.isOpen && venueInfo.bestPhoto && (
                <InfoWindow>
                    <React.Fragment>
                        <img src={`${venueInfo.bestPhoto.prefix}300x300${venueInfo.bestPhoto.suffix}`} alt={"Museum's View"} />
                        <p><strong>{venueInfo.name}</strong></p>
                        <p><i>{venueInfo.location.formattedAddress[0]}</i></p>
                        <p><i>{venueInfo.location.formattedAddress[1]}</i></p>
                        <p><i>{venueInfo.location.formattedAddress[2]}</i></p>
                        <p><i>{venueInfo.location.formattedAddress[3]}</i></p>
                    </React.Fragment>
                </InfoWindow>
                )}
                </Marker>
            );
        })}
    </GoogleMap>
))
);

// Map component - to load the google map 
export default class Map extends Component {

    render() {
        return(
            // Loading the Google map
            <MyMapComponent
                {...this.props}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBTi9iAGPvuejPFOjQAs-1JhcFMtDNrd68"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%`, width: `70%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        );
    }
}