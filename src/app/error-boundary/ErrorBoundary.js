import React, {Component} from "react";
import ErrorIndicator from "../error-indicator/ErrorIndicator";
import './ErrorBoundary.css'
export  default class ErrorBoundary extends Component{
    state = {
        error: false
    }
    componentDidCatch(error, errorInfo) {
        console.log('Catching err');
        this.setState({error: true})
    }
    reloadAfterError = (e) => {
        e.preventDefault();
        this.setState({error: false})
        console.log('its works!')
    }
    render() {
        if (this.state.error) {
            return <ErrorIndicator reloadAfterError={this.reloadAfterError}/>
        }
        return this.props.children;
    }
}