import React, { Component } from "react";
import './Toggle_Random_Planet.scss';

export default class extends Component {
    render() {
        const { on_random_planet_toggle, planet_state } = this.props;
        const position = planet_state ? 'toggle_random_planet' : 'toggle_random_planet in_list';
        const button_message = planet_state ? 'Hide random planet' : 'Show random planet';
        return (
            <button
                className={ position }
                onClick={ on_random_planet_toggle }>
                <span>
                    { button_message }
                </span>
            </button>
        )
    }
}