import React from "react";
import TodoListItem from "../todo-list-item/TodoListItem.js";
import './TodoList.css'

const TodoList = ({todos, onDelete, onEdit, editDisabled}) => {
    const elements_active =  todos.filter((item) => (item.status === false))
    const show_elements_active = elements_active.map((item) => {
        const {id, ...itemProps} = item;
            return (
                <li key={id}
                    className="list-group-item"
                >
                    <TodoListItem
                        {...itemProps}
                        onDelete={() => onDelete(id)}
                        onEdit={() => onEdit(id)}
                        editDisabled={editDisabled}
                    />
                </li>
            )
    })

    const elements_disabled =  todos.filter((item) => (item.status === true))
    const show_elements_disabled = elements_disabled.map((item) => {
        const {id, ...itemProps} = item;
            return (
                <li key={id}
                    className="list-group-item text-black-50"
                >
                    <TodoListItem
                        {...itemProps}
                        onDelete={() => onDelete(id)}
                        onEdit={() => onEdit(id)}
                        editDisabled={editDisabled}
                    />
                </li>
            )
    })
    return (
        <div className='row'>
            <div className="col-12">
                <ul className="list-group todo-list w-100">

                    <h3 className="mt-3">В работе</h3>
                    {elements_active.length === 0 ? 'Ничего нет': ''}
                    {show_elements_active}
                    <h3 className="mt-3">Завершено</h3>
                    {elements_disabled.length === 0  ?  'Ничего нет': ''}
                    {show_elements_disabled}

                </ul>
            </div>
        </div>
    )
}
export default TodoList;