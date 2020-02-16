import React, { Component } from "react";
import './Random_Planet.scss';

import Swapi from "../../services/Swapi";
import Spinner from "../Spinner/Spinner";
import Random_Planet_Details from "../Random_Planet_Details/Random_Planet_Details";
import Loading_Error from "../Loading_Error/Loading_Error";
import placeholder from "../Random_Planet_Details/Planet_Placeholder.jpg";

export default class extends Component {
    #swapi = new Swapi();

    state = {
        url: null,
        planet: {},
        loading: true,
        error: false
    };

    #is_mounted = false;

    componentDidMount() {
        this.#is_mounted = true;
        this.update_planet();
        this.interval = setInterval(this.update_planet, 20000);
    }

    componentWillUnmount() {
        this.#is_mounted = false;
        clearInterval(this.interval);
    }

    on_planet_loaded = (planet) => {
        if (this.#is_mounted) {
            this.setState({
                planet,
                loading: false
            });
            this.#swapi.get_planet_img(planet.id)
                .then(this.get_img_url);
        }
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

    on_error = () => {
        this.setState({
           error: true,
           loading: false
        });
    };

    update_planet = () => {
        const id = Math.floor(Math.random() * 61) + 1;
        this.#swapi.get_planet(id)
            .then(this.on_planet_loaded)
            .catch(this.on_error);
    };

    render() {
        const { url, planet, loading, error } = this.state;
        const has_data = !(loading || error);
        const error_message = error ? <Loading_Error/> : null;
        const spinner = loading ? <Spinner/> : null;
        const planet_data = has_data ? <Random_Planet_Details planet={ planet } url={ url }/> : null;
        return(
            <div className={ 'planet_data jumbotron rounded' }>
                { error_message }
                { spinner }
                { planet_data }
            </div>
        )
    }
}