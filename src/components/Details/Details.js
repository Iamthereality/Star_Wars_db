import React, { Component } from "react";
import './Details.scss';

import Item_Details from "../Item_Details/Item_Details";
import Swapi from "../../services/Swapi";
import placeholder from "../Random_Planet_Details/Planet_Placeholder.jpg";
import Loading_Error from "../Loading_Error/Loading_Error";
import Spinner from "../Spinner/Spinner";

export default class extends Component {
    #swapi = new Swapi();

    state = {
        url: null,
        item: null,
        loading: null,
        error: false
    };

    componentDidMount() {
        this.update_item_details();
    }

    componentDidUpdate(prevProps) {
        if (this.props.item_id !== prevProps.item_id) {
            this.setState({
               loading: true
            });
            this.update_item_details();
        }
    }

    on_item_loaded = (item) => {
        this.setState({
            item: item,
            loading: false
        });
        this.update_item_img();
    };

    on_error = () => {
        this.setState({
            error: true,
            loading: false
        });
    };

    get_img_url = (res) => {
        if (res.ok) {
            this.setState({
                url: `${res.url}`
            });
        } else {
            this.setState({
                url: placeholder
            });
        }
    };

    update_item_img = () => {
        const { category } = this.props;
        if (category === 'persons') {
            this.#swapi.get_person_img(this.props.item_id)
                .then(this.get_img_url);
        } else if (category === 'planets') {
            this.#swapi.get_planet_img(this.props.item_id)
                .then(this.get_img_url);
        } else if (category === 'starships') {
            this.#swapi.get_starship_img(this.props.item_id)
                .then(this.get_img_url);
        }
    };

    update_item_details = () => {
        if (!this.props.item_id) {
            return;
        }
        const { category } = this.props;
        if (category === 'persons') {
            this.#swapi.get_person(this.props.item_id)
                .then(this.on_item_loaded)
                .catch(this.on_error);
        } else if (category === 'planets') {
            this.#swapi.get_planet(this.props.item_id)
                .then(this.on_item_loaded)
                .catch(this.on_error);
        } else if (category === 'starships') {
            this.#swapi.get_starship(this.props.item_id)
                .then(this.on_item_loaded)
                .catch(this.on_error);
        }
    };

    render() {
        const { url, item, loading, error } = this.state;
        const has_data = !(loading || error) && item;
        const error_message = error ? <Loading_Error/> : null;
        const spinner = loading ? <div className={ `message` }><Spinner/></div>  : null;
        const item_details = has_data ? <Item_Details item={ item } url={ url } category={ this.props.category } item_selected={ this.props.item_selected }/> : null;
        const start_message = !loading && !error && !item ? <div className={ `message` }><h2>Select the list item or change the category</h2></div> : null;

        return(
            <div className="details jumbotron rounded">
                { start_message }
                { item_details }
                { spinner }
                { error_message }
            </div>
        )
    }
}