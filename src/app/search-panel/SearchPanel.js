import React, {Component} from "react";
import './SearchPanel.css'
export default class SearchPanel extends Component {

    state = {
        term: ''
    }
    onSearch = (e) => {
        const term = e.target.value
        this.setState({term})
        this.props.onSearching(term);
    }

    render() {
        const searchText = 'Поиск по задачам';
        return (

            <div className="input-group mb-3 search-panel">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1"><span className="fa fa-search"></span></span>
                </div>
                <input type="text" className="form-control"
                       placeholder={searchText}
                       aria-describedby="basic-addon1"
                       onChange={this.onSearch}
                       value={this.state.term}
                />
            </div>

        )
    }


}