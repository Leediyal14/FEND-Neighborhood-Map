import React, { Component } from 'react';
import List from './List.js';

// ListItems component - to get venues and handle the list clicks
export default class ListItems extends Component {

    render() {
        return (
            <ol className="listItems">
                {this.props.venues && this.props.venues.map((venue, index) => 
                    <List 
                        key={index} {...venue} 
                        handleListClick={this.props.handleListClick} // Handle the list clicks
                    />
                )}
            </ol>
        );
    }
}