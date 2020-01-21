import React, { Component } from "react";
import './Loading_Error.scss';
import error_icon from './Loading_Error.png';

export default class extends Component {
    render() {
        return (
            <>
                <div className="content">
                    <div className="error_message">
                        <img src={ error_icon } alt="error icon"/>
                        <h2>Oops...</h2>
                        <span>Something went wrong!</span>
                        <span>But our droids already fixing it.</span>
                    </div>
                </div>
            </>
        )
    }
}