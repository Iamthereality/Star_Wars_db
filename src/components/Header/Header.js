import React, { Component } from "react";
import './Header.scss';

export default class extends Component {
    state = {
        width: null,
        menuIsOpen: false
    };

    componentDidMount() {
        this.updateWidth();
        window.addEventListener('resize', this.updateWidth);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.width !== this.state.width) {
            this.updateWidth();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
    }

    updateWidth = () => {
        this.setState({ width: window.innerWidth });
    };

    buttons = [
        {name: 'planets', label: 'Planets'},
        {name: 'starships', label: 'Starships'},
        {name: 'persons', label: 'Characters'},
    ];

    on_menu_button_click = () => {
        if (this.state.menuIsOpen === false) {
            this.setState({
                menuIsOpen: true
            });
        } else {
            this.setState({
                menuIsOpen: false
            });
        }
    };

    render() {
        const buttons = this.buttons.map(({ name, label }) => {
            return (
                <button
                    onClick={ () => this.props.on_category_button_click(name) }
                    key={ name }
                    type={ 'button' }
                    className={ 'navigation_button' }>
                    { label }
                </button>
            )
        });
        const listItems = this.buttons.map(({ name, label }) => {
            return (
                <li
                    onClick={ () => {
                        this.props.on_category_button_click(name);
                        this.on_menu_button_click();
                    } }
                    key={ name }
                    type={ 'button' }
                    className={ 'navigation_button' }>
                    { label }
                </li>
            )
        });

        const menu_button_classes = this.state.menuIsOpen === false ?  'menu_button closed' : 'menu_button';
        const menu_overlay = this.state.menuIsOpen === false ?  'menu_overlay' :  'menu_overlay visible';
        const side_menu = this.state.menuIsOpen === false ?  'side_menu' :  'side_menu open';

        const content = this.state.width < 769 ? (
            <div className={ 'menu' }>
                <div className={ menu_overlay } onClick={ () => {
                    this.setState({
                        menuIsOpen: false
                    });
                } }/>
                <div className={ menu_button_classes } onClick={ this.on_menu_button_click }>
                    <span className={ 'menu_button_bar' }/>
                    <span className={ 'menu_button_bar' }/>
                    <span className={ 'menu_button_bar' }/>
                </div>
                <div className={ side_menu }>
                    <ul className={ 'menu_list' }>
                        { listItems }
                    </ul>
                </div>
            </div>
        ) : (
            <div className="buttons">
                { buttons }
            </div>
        );

        return (
            <header>
                <div
                    className="container">
                    <div
                        className="logo">
                        { 'Star Wars DB' }
                    </div>
                    { content }
                </div>
            </header>
        )
    }
}
