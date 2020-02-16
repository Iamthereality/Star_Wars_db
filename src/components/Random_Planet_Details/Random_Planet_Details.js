import React, { Component } from "react";
import './Random_Planet_Details.scss';

export default class extends Component {
    render() {
        const { url, planet: { name, population, rotation_period, diameter} } = this.props;
        return (
            <>
                <div className="planet_content">

                    <img
                        className={ 'planet_image' }
                        src={ url }
                        alt={ '' }/>

                    <div className="planet_description">
                        <h2 className={ 'term' }> { name }</h2>
                        <ul className={ 'list-group list-group-flush' }>
                            <li className={ 'list-group-item' }>
                                <span>Population: </span>
                                <span
                                    className={ 'term' }>
                                { population }
                            </span>
                            </li>
                            <li className={ 'list-group-item' }>
                                <span>Rotation period: </span>
                                <span
                                    className={ 'term' }>
                                { rotation_period }
                            </span>
                            </li>
                            <li className={ 'list-group-item' }>
                                <span>Diameter: </span>
                                <span
                                    className={ 'term' }>
                                { diameter }
                            </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}