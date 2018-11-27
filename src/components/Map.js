import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props =>
    <GoogleMap
        defaultZoom={8}
        zoom={props.zoom}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        center={props.center}
    >
        {props.markers && 
            props.markers.filter(marker => marker.isVisible)
            .map((marker, index) => {
                const venueInfo = props.venues.find(venue => venue.id ===marker.id);
            return (
                <Marker 
                    key={index} 
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => props.handleClick(marker)}
                >
                {marker.isOpen && venueInfo.bestPhoto && (
                <InfoWindow>
                    <React.Fragment>
                        <img src={`${venueInfo.bestPhoto.prefix}200*200${venueInfo.bestPhoto.suffix}`} alt={"Museum's View"}/>
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

export default class Map extends Component {
    render() {
        return(
            <MyMapComponent
                {...this.props}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&
                key=AIzaSyBTi9iAGPvuejPFOjQAs-1JhcFMtDNrd68"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        );
    }
}