import React, {Component} from "react";
import './CreateTaks.css';
import ErrorBoundary from "../error-boundary/ErrorBoundary";
import TagList from "../tag-list/TagList";
import CreateTag from "../create-tag/CreateTag";

export default class CreateTask extends Component {
    state = {
        error: '',
    };
    onSubmit = (e) => {
        e.preventDefault()
        if (this.props.title !== '') {
            this.setState({
                error: ''
            })
            this.props.onSubmit();
        }else {
            this.setState({
                error: 'Поле должно быть заполнено'
            })
        }
    }
    onUpdate = (e) => {
        e.preventDefault()
        if (this.props.title !== '') {
            this.setState({
                error: ''
            })
            this.props.onUpdate();
        }else {
            this.setState({
                error: 'Поле должно быть заполнено'
            })
        }
    }
    render() {
        const {priority, status, title, editDisabled,
            tag_title, editTagDisabled, tags, selected_tags,
            onSubmitTag, onUpdateTag, onDeleteTag, onEditTag, onToggleTag, onChange} = this.props;
        const {error} = this.state;
        return (
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Название</label>
                            <div className="row">
                                <div className="col-md-12">
                                    <input type="text" className="form-control" id="title" name="title"
                                           value={title || ''}
                                           onChange={onChange}/>
                                    {error !== '' ? (<p className='text-danger'>{error}</p>) : ''}
                                </div>

                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label htmlFor="priority">Приоритет</label>
                                    <select className="form-control" name="priority" id="priority"
                                            onChange={onChange}>
                                        <option value='0' selected={priority === 0 ? 'selected' : ''}>Низкий
                                        </option>
                                        <option value='1' selected={priority === 1 ? 'selected' : ''}>Средний
                                        </option>
                                        <option value='2' selected={priority === 2 ? 'selected' : ''}>Высокий
                                        </option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="status">Статус</label>
                                    <select className="form-control" name="status" id="status"
                                            onChange={onChange}>
                                        <option value="0" selected={status === false ? 'selected' : ''}>В работе
                                        </option>
                                        <option value="1" selected={status === true ? 'selected' : ''}>Завершена
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <ErrorBoundary>
                            <div className="row mt-3 mb-3">
                                <div className="col-md-6">
                                    <TagList
                                        tags={tags}
                                        onDeleteTag={onDeleteTag}
                                        onEditTag={onEditTag}
                                        onToggleTag={onToggleTag}
                                        editTagDisabled={editTagDisabled}
                                        selected_tags={selected_tags}
                                    />

                                </div>
                                <div className="col-md-6">
                                    <CreateTag
                                        tag_title={tag_title}
                                        editTagDisabled={editTagDisabled}
                                        onChange={onChange}
                                        onSubmitTag={onSubmitTag}
                                        onUpdateTag={onUpdateTag}
                                    />
                                </div>
                            </div>
                        </ErrorBoundary>
                        {!editDisabled ? (
                            <button type='submit'
                                    onClick={this.onSubmit}
                                    className="btn btn-success btn-block">
                                Создать
                            </button>
                        ) : ('')}
                        {editDisabled ? (
                            <button
                                type="submit"
                                onClick={this.onUpdate}
                                className="btn btn-primary btn-block">
                                Обновить
                            </button>
                        ) : ('')}
                    </form>
                </div>
            </div>
        )
    }
}