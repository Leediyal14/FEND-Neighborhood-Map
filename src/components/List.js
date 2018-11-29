import React, { Component } from 'react';

// List component - to list the venues in order
export default class List extends Component {
    render() {
        return (
            <li className="list"
                tabIndex={1}
                onClick={() => this.props.handleListClick(this.props)} // Creates the list of venues
            >
            {this.props.name}
            </li>
        );
    }
}