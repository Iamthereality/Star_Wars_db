import React, { Component } from "react";
import './Header.scss';

export default class extends Component {
    buttons = [
        {name: 'planets', label: 'Planets'},
        {name: 'starships', label: 'Starships'},
        {name: 'characters', label: 'Characters'},
    ];
    render() {
        const buttons = this.buttons.map(({ name, label }) => {
            return (
                <button
                    key={ name }
                    type={ 'button' }
                    className={ 'navigation_button' }>
                    { label }
                </button>
            )
        });
        return (
            <header>
                <div
                    className="container">
                    <div
                        className="logo">
                        { 'Star Wars DB' }
                    </div>
                    <div className="buttons">
                        { buttons }
                    </div>
                </div>
            </header>
        )
    }
}