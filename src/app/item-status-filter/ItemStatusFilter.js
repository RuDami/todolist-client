import React, {Component} from "react";
import './ItemStatusFilter.css'

export default class ItemStatusFilter extends Component {
    buttons= [
        {name: 'all', label: 'Все'},
        {name: 'low', label: 'Низкий'},
        {name: 'middle', label: 'Средний'},
        {name: 'hight', label: 'Высокий'}
    ]
    render() {

        const buttons = this.buttons.map(({name, label}) => {
            const {filter, onFilterChange} = this.props;
            const isActive = filter === name;
            const myclass   = isActive ? 'btn-info' : 'btn-outline-secondary'
            return (
                <button key={name} type="button" onClick={() => onFilterChange(name)}  className={`btn ${myclass}`}>{label}</button>
            )
        })
        return (
            <div className="btn-group w-100 item-status-filter" role="group" aria-label="Basic example">
                {buttons}
            </div>
        )
    }
}
