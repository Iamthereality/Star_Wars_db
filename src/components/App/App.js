import React, { Component } from "react";
import './App.scss';

import Header from '../Header/Header'
import Toggle_Random_Planet from "../Toggle_Random_Planet/Toggle_Random_Planet";
import Random_Planet from '../Random_Planet/Random_Planet';
import Item_List from "../Item_List/Item_List";
import Details from "../Details/Details";
import Planet_Details from '../Planet_Details/Planet_Details';
import Starship_Details from '../Starship_Details/Starship_Details';
import Person_Details from '../Person_Details/Person_Details';
import Loading_Error from "../Loading_Error/Loading_Error";

export default class extends Component {
    state = {
        show_random_planet: true,
        person_id: null
    };

    on_person_selected = (id) => {
        this.setState({
            person_id: id,
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

    render() {
        const { show_random_planet } =this.state;
        const random_planet = show_random_planet ? <Random_Planet/> : null;
        return(
            <>
                <Header />
                <div className={ 'container' }>
                    <div className="upper_section">
                        <Toggle_Random_Planet
                            on_random_planet_toggle={ this.on_random_planet_toggle }
                            planet_state={ show_random_planet }/>
                        { random_planet }
                    </div>
                    <div className="bottom_section">
                        <div className="left_part">
                            <Item_List
                                on_item_selected={ this.on_person_selected }
                                planet_state={ show_random_planet }/>
                        </div>
                        <div className="right_part">
                            <Details person_id={ this.state.person_id }/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}