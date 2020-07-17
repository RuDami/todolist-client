import React, {Component} from "react";

export default class ErrorButton extends Component{
    state = {
        renderError: false
    }
    badFunc() {

    }
    render() {
        if (this.state.renderError) {
            this.fo.bar = 0
        }
        return (
            <button className='btn btn-danger mt-5 mb-4' onClick={() => this.setState({renderError: true})}>
               Вызвать ошибку
            </button>
        )
    }
}