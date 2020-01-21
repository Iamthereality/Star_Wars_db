import React, { Component } from "react";
import './Person_Details.scss';

export default class extends Component {
    render() {
        const { person: {name, gender, birth_year, eye_color}, url } = this.props;
        return(
            <>
                <img src={ url } alt=""/>
                <ul className={ 'list-group list-group-flush' }>
                    <h2>{ name }</h2>
                    <li className={ 'list-group-item' }>
                        <span>Birth date: </span>
                        <span
                            className={ 'term' }>
                                { birth_year }
                            </span>
                    </li>
                    <li className={ 'list-group-item' }>
                        <span>Gender: </span>
                        <span
                            className={ 'term' }>
                                { gender }
                            </span>
                    </li>
                    <li className={ 'list-group-item' }>
                        <span>Eye color: </span>
                        <span
                            className={ 'term' }>
                                { eye_color }
                            </span>
                    </li>
                </ul>
            </>
        )
    }
}