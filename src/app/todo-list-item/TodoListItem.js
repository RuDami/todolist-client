import React, {Component} from "react";
import './TodoListItem.css'
export default class TodoListItem extends Component {

    render() {

        const {title, priority, status, tags, onDelete, onEdit, editDisabled, done, important} = this.props;
        /*const spanStyle = {
            color: important ? 'blue' : 'black'
        }*/
        let classNames = 'h3 d-block';
        if (done) {
            classNames += ' done '
        }
        if (important) {
            classNames += ' important'
        }
        const parse_tags = tags.map((item) => {
            const {id, title} = item;
            return (
                <div className="col-6" key={id} >
                    <div key={id}
                         className="rounded bg-light mb-2 p-3">
                        {title}
                    </div>
                </div>

            )
        })
        return (
            <div className="row todo-list-item">
                <div className="col-9">
                     <span  className={classNames}>{title}</span>
                    <b>{status ?  'Завершена' : 'В работе'}</b>
                    <p>
                        {priority === 0 ? 'Низкий приоритет' : ''}
                        {priority === 1 ? 'Средний приоритет' : ''}
                        {priority === 2 ? 'Высокий приоритет' : ''}
                    </p>
                    Теги:
                        <div  className="row">
                            {parse_tags.length === 0 ? 'Тегов нет' :parse_tags  }
                        </div>

                </div>
                <div className="col-3">
                    <button
                        disabled={editDisabled}
                        type="button"
                        className="btn btn-outline-success mr-2"
                        onClick={onEdit}
                    ><span className="fa fa-edit"/>
                    </button>
                    <button
                        disabled={editDisabled}
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={onDelete}
                    >
                        <span className="fa fa-trash"/>
                    </button>
                </div>
            </div>

        )
    }
}