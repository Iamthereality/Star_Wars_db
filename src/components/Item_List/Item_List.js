import React, { Component } from "react";
import './Item_List.scss';

import Swapi from "../../services/Swapi";
import Spinner from "../Spinner/Spinner";

export default class extends Component {
    #swapi = new Swapi();

    state = {
        persons_list: null
    };

    componentDidMount() {
        this.#swapi.get_all_persons()
            .then((persons_list) => {
                this.setState({
                    persons_list: persons_list
                });
            });
    }

    list_items = (persons_list) => {
        return persons_list.map(({ id, name }) => {
            return (
                <li className="list-group-item"
                    key={ id }
                    onClick={ () => this.props.on_item_selected(id) }>
                    <span>
                        { name }
                    </span>
                </li>
            )
        })
    };

    render() {
        const  { persons_list } = this.state;
        const { planet_state } = this.props;
        const position = planet_state ? 'item_list list-group' : 'item_list list-group list_moved';
        if (!persons_list){
            return <Spinner/>;
        }

        const items = this.list_items(persons_list);

        return (
            <>
                <ul className={ position }>
                    { items }
                </ul>
            </>
        )
    }
}