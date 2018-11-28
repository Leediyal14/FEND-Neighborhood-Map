import React, { Component } from 'react';
import List from './List.js';

export default class ListItems extends Component {

    render() {
        return (
            <ol className="listItems">
                {this.props.venues && this.props.venues.map((venue, index) => 
                    <List 
                        key={index} {...venue} handleListClick={this.props.handleListClick}
                    />
                )}
            </ol>
        );
    }
}