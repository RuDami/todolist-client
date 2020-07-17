import React, {Component} from "react";

export default class CreateTag extends Component {

    state = {
        error: '',
    };
    onSubmit = () => {
        if (this.props.tag_title !== '') {
            this.setState({
                error: ''
            })
            this.props.onSubmitTag();
        }else {
            this.setState({
                error: 'Поле должно быть заполнено'
            })
        }
    }
    onUpdate = (e) => {
        e.preventDefault()
        if (this.props.tag_title !== '') {
            this.setState({
                error: ''
            })
            this.props.onUpdateTag();
        }else {
            this.setState({
                error: 'Поле должно быть заполнено'
            })
        }
    }
    render() {
        const {tag_title,editTagDisabled, onChange} = this.props;
        const {error} = this.state;
        return (

            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <label htmlFor="tag_title">Название тега</label>
                        <div className="row">
                            <div className="col-md-12">
                                <input type="text" className="form-control" id="tag_title"
                                       name="tag_title"
                                       value={tag_title || ''}
                                       onChange={onChange}/>
                                {error !== '' ? (<p className='text-danger'>{error}</p>) : ''}
                            </div>
                        </div>
                    </div>
                    {!editTagDisabled ? (
                        <div onClick={this.onSubmit}
                             className="btn btn-warning btn-block">Создать тег
                        </div>
                    ) : ('')}
                    {editTagDisabled ? (
                        <div onClick={this.onUpdate}
                             className="btn btn-primary btn-block">Обновить тег
                        </div>
                    ) : ('')}
                </div>
            </div>
        )
    }
}