import React, { Component } from 'react';
import ListItems from './ListItems.js';

export default class ListView extends Component {

    constructor() {
        super();
        this.state = {
            query: "",
            venues: []
        };
    }

    handleFilterVenues = () => {
        if (this.state.query.trim() !== "") {
            const venues = this.props.venues.filter(venue => venue.name.toLowerCase()
                .includes(this.state.query.toLowerCase()))
            return venues;
        }
        return this.props.venues;
    };

    handleInput = evt => {
        this.setState({query: evt.target.value});
        const markers = this.props.venues.map(venue => {

            const isMatched = venue.name.toLowerCase()
                              .includes(evt.target.value.toLowerCase());
            const marker = this.props.markers.find(marker => marker.id === venue.id);
            if (isMatched) {
                marker.isVisible = true;
            } else {
                marker.isVisible = false;
            }
            return marker;
        });
        this.props.updateSuperState({markers})
    };

    render() {
        return (
            <div className="listView">
                <h2>Museums In Ooty</h2>
                <input 
                    type={"search"} 
                    id={"search"} 
                    placeholder={"Search Museum"} 
                    onChange={this.handleInput}
                />
                <ListItems 
                    {...this.props} 
                    venues={this.handleFilterVenues()}
                    handleListClick={this.props.handleListClick}
                />
            </div>
        );
    }
}