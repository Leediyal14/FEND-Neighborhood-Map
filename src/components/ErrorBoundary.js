import React, { Component } from 'react';
import ErrorReport from './ErrorReport';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            info: '',
            error: ''
        };
    }

    componentDidCatch(error, info) {
        this.setState({ 
            hasError: true, 
            info, 
            error 
        });
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            console.log(`Error: ${error}`);
            console.log(`ErrorInfo: ${JSON.stringify(info)}`);
        }
        
        else {
            ErrorReport.report(error, info);
        }
        
    }

    render() {
        return this.state.hasError ? 
            <p><i>Oops... Cannot load the Google Map  :(   Check your connecction or try again later... Thank you for your visit!!!</i></p> :
            this.props.children;
    }
}

export default ErrorBoundary;