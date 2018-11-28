import React, { Component } from 'react';

export default class List extends Component {
    render() {
        return (
            <li className="list" 
                onClick={() => this.props.handleListClick(this.props)}
            >
            {this.props.name}
            </li>
        );
    }
}