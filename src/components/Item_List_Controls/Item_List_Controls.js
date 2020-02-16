import React, { Component } from "react";
import './Item_List_Controls.scss';

export default class extends Component {
    render() {
        return (
            <div className={ 'item_list_controls' }>
                <button>
                    <span>Prev list part</span>
                </button>
                <button>
                    <span>Next list part</span>
                </button>
            </div>
        )
    }
}