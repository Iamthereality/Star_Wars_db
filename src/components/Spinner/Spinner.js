import React, { Component } from "react";
import './Spinner.scss';

export default class extends Component {
    render() {
        return(
            <div className="loading_spinner">
                <div className="spinner">
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }
}