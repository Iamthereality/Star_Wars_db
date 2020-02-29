import React, { Component } from "react";
import './App.scss';

import Header from '../Header/Header'
import Toggle_Random_Planet from "../Toggle_Random_Planet/Toggle_Random_Planet";
import Random_Planet from '../Random_Planet/Random_Planet';
import Item_List from "../Item_List/Item_List";
import Details from "../Details/Details";

export default class extends Component {
    state = {
        show_random_planet: true,
        category: 'planets',
        item_id: null,
        item_selected: false
    };

    on_item_selected = (id) => {
        this.setState({
            item_id: id,
            item_selected: true
        });
    };

    on_random_planet_toggle = () => {
        if (this.state.show_random_planet) {
            this.setState({
                show_random_planet: false
            });
        } else {
            this.setState({
                show_random_planet: true
            });
        }
    };

    on_category_button_click = (name) => {
       this.setState({
           category: name,
           item_selected: false
       });
    };

    render() {
        const { show_random_planet, category } = this.state;
        const random_planet = show_random_planet ? <Random_Planet/> : null;
        const right_part = show_random_planet ? 'right_part' : 'right_part moved';
        const left_part = show_random_planet ? 'left_part' : 'left_part moved';
        const bottom_section = show_random_planet ? 'bottom_section' : 'bottom_section bottom_moved';
        return(
            <>
                <Header on_category_button_click={ this.on_category_button_click }/>
                <div className={ 'container' }>
                    <div className="upper_section">
                        <Toggle_Random_Planet
                            on_random_planet_toggle={ this.on_random_planet_toggle }
                            planet_state={ show_random_planet }/>
                        { random_planet }
                    </div>
                    <div className={ bottom_section }>
                        <div className={ left_part }>
                            <Item_List
                                on_item_selected={ this.on_item_selected }
                                random_planet_state={ show_random_planet }
                                category={ category }/>
                        </div>
                        <div className={ right_part }>
                            <Details item_id={ this.state.item_id } category={ this.state.category } item_selected={ this.state.item_selected }/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}