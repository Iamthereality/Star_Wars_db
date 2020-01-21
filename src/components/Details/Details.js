import React, { Component } from "react";
import './Details.scss';

import Person_Details from "../Person_Details/Person_Details";
import Swapi from "../../services/Swapi";
import placeholder from "../Planet/Planet_Placeholder.jpg";
import Loading_Error from "../Loading_Error/Loading_Error";
import Spinner from "../Spinner/Spinner";

export default class extends Component {
    #swapi = new Swapi();

    state = {
        url: null,
        person: null,
        loading: this.props.loading_status,
        error: false
    };

    componentDidMount() {
        this.update_person();
    }

    componentDidUpdate(prevProps) {
        if (this.props.person_id !== prevProps.person_id) {
            this.update_person();
        }
    }

    on_person_loaded = (person) => {
        this.setState({
            person,
            loading: false
        });
        this.update_person_img();
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

    update_person_img = () => {
        this.#swapi.get_person_img(this.props.person_id)
            .then(this.get_img_url);
    };

    update_person = () => {
        if (!this.props.person_id) {
            return;
        }

        this.#swapi.get_person(this.props.person_id)
            .then(this.on_person_loaded)
            .catch(this.on_error);
    };

    render() {
        const { url, person, loading, error } = this.state;

        const error_message = !loading && error && !person ? <Loading_Error/> : null;
        const spinner = loading && !error && !person ? <div className={ `message` }><Spinner/></div>  : null;
        const person_details = !loading && !error && person ? <Person_Details person={ person } url={ url }/> : null;
        const select_person = !loading && !error && !person ? <div className={ `message` }><h2>Select a person from the list</h2></div> : null;

        return(
            <div className="details jumbotron rounded">
                { select_person }
                { person_details }
                { spinner }
                { error_message }
            </div>
        )
    }
}