import React, { Component } from "react";
import './Item_List.scss';

import Swapi from "../../services/Swapi";
import Spinner from "../Spinner/Spinner";
import Loading_Error from "../Loading_Error/Loading_Error";

export default class extends Component {
    #swapi = new Swapi();

    state = {
        error: false,
        loading: null,
        items_list: null
    };

    on_error = () => {
        this.setState({
            error: true,
            loading: true
        });
    };

    componentDidMount() {
        this.update_items_list();
    }

    componentDidUpdate(prevProps) {
        if (this.props.category !== prevProps.category) {
            this.setState({
                loading: true
            });
            this.update_items_list();
        }
    }

    update_items_list = () => {
        const { category } = this.props;
        if (category === 'persons') {
            this.#swapi.get_all_persons()
                .then(this.set_items_list)
                .catch(this.on_error);
        } else if (category === 'planets') {
            this.#swapi.get_all_planets()
                .then(this.set_items_list)
                .catch(this.on_error);
        } else if (category === 'starships') {
            this.#swapi.get_all_starships()
                .then(this.set_items_list)
                .catch(this.on_error);
        }
    };

    set_items_list = (items_list) => {
        this.setState({
            items_list: items_list,
            loading: false
        });
    };

    on_item_click = (id) => {
        this.props.on_item_selected(id);
    };

    render_item = (items_list) => {
        return items_list.map(({ id, name }) => {
            return (
                <li className="list-group-item"
                    key={ id }
                    onClick={ () => this.on_item_click(id) }>
                    <span>
                        { name }
                    </span>
                </li>
            )
        })
    };

    render() {
        const  { items_list, loading } = this.state;
        const { random_planet_state } = this.props;
        const list_position = random_planet_state ? 'item_list list-group' : 'item_list list-group list_moved';
        if (!items_list || loading) {
            return <Spinner/>;
        }

        const items = this.render_item(items_list);

        return (
            <ul className={ list_position }>{ items }</ul>
        )
    }
}