import React, { Component } from "react";
import './Item_Details.scss';

export default class extends Component {
    #prev_cat = '';
    state = {
        planet: [
            { property: 'Population', value: this.props.item.population },
            { property: 'Rotation period', value: this.props.item.rotation_period },
            { property: 'Diameter', value: this.props.item.diameter }
        ],
        starship: [
            { property: 'Model', value: this.props.item.model },
            { property: 'Manufacturer', value: this.props.item.manufacturer },
            { property: 'Passengers', value: this.props.item.passengers },
            { property: 'Length', value: this.props.item.length },
            { property: 'Crew', value: this.props.item.crew },
            { property: 'Cost in credits', value: this.props.item.cost_in_credits },
            { property: 'Cargo capacity', value: this.props.item.cargo_capacity }
        ],
        person: [
            { property: 'Gender', value: this.props.item.gender },
            { property: 'Birth year', value: this.props.item.birth_year },
            { property: 'Eye color', value: this.props.item.eye_color }
        ]
    };

    render_item_details = (item) => {
        return item.map(({ property, value }) => {
            return (
                <li className={ 'list-group-item' }
                    key={ property }>
                    <span>{ property }:</span>
                    <span className={ 'term' }> { value }</span>
                </li>
            )
        })
    };

    item_details = () => {
        const { category } = this.props;
        const { planet, starship, person } = this.state;

        if (category === 'persons') {
            return this.render_item_details(person);
        } else if (category === 'planets') {
            return this.render_item_details(planet);
        } else if (category === 'starships') {
            return this.render_item_details(starship);
        }
    };

    image_class = () => {
        const { category } = this.props;
        if (category === 'persons') {
            this.#prev_cat = 'persons';
            return 'person';
        } else if (category === 'planets') {
            this.#prev_cat = 'planets';
            return 'planet';
        } else if (category === 'starships') {
            this.#prev_cat = 'starships';
            return 'starship';
        }
    };

    render() {
        const { item: { name }, url, item_selected } = this.props;
        let class_list, items;
        if (item_selected) {
            class_list = this.image_class();
            items = this.item_details();
        } else if (this.#prev_cat === 'persons') {
            class_list = 'person';
            items = this.render_item_details(this.state.person);
        } else if (this.#prev_cat === 'planets') {
            class_list = 'planet';
            items = this.render_item_details(this.state.planet);
        } else if (this.#prev_cat === 'starships') {
            class_list = 'starship';
            items = this.render_item_details(this.state.starship);
        }

        return(
            <>
                <img src={ url } className={ class_list } alt=""/>
                <div className="description">
                    <h2>{ name }</h2>
                    <ul className={ 'list-group list-group-flush' }>
                        { items }
                    </ul>
                </div>
            </>
        )
    }
}