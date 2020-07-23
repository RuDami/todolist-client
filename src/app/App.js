import React, {Component} from "react";
import {getList, addItem, deleteItem, updateItem} from "./api/ListFunc";
import {getTags, addTag, deleteTag, updateTag} from "./api/TagFunc";
import ItemStatusFilter from "./item-status-filter/ItemStatusFilter";
import SearchPanel from "./search-panel/SearchPanel";
import TodoList from "./todo-list/TodoList";
import ErrorBoundary from "./error-boundary/ErrorBoundary";
import ErrorButton from "./error-button/error-button";
import CreateTask from "./create-task/CreateTask";
import './App.css'

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            title: '',
            status: 0,
            priority: 0,
            selected_tags: [],
            items: [],
            editDisabled: false,
            tag_id: '',
            tag_title: '',
            editTagDisabled: false,
            tags: [],
            term: '',
            filter: 'all'
        };
    }

    // грузим все при создании
    componentDidMount() {
        this.getAll();
        this.getAllTags();
    }

    // проверка изменений полей и внесение извенений в стейт
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    /*--- Все что связано с тасками ---*/
    //получение
    getAll = () => {
        getList().then(data => {
            this.setState({
                    title: '',
                    status: 0,
                    priority: 0,
                    items: [...data].sort(function (a, b) {
                        return new Date(b.created_at) - new Date(a.created_at);
                    }).sort()
                },
                () => {
                    console.log(this.state.items)
                })
        })
    }
    //отправка
    onSubmit = () => {
        addItem(this.state.title, this.state.status, this.state.priority, this.state.selected_tags).then(() => {
            this.getAll()
        })
        this.setState({
            title: '',
            status: 0,
            priority: 0,
            selected_tags: []
        })
    }
    //обновление
    onUpdate = () => {
        updateItem(this.state.title, this.state.status, this.state.priority, this.state.selected_tags, this.state.id).then(() => {
            this.getAll();

        })
        this.setState({
            title: '',
            status: 0,
            priority: 0,
            selected_tags: [],
            editDisabled: '',
            error: ''
        })
        this.getAll()
    }
    // редактирование
    onEdit = (id) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        let data = [...this.state.items]
        data.forEach((item, index) => {
            if (item.id === id) {
                this.setState(() => {
                    let selectedTags = [];
                    item.tags.forEach((tag) => {
                        selectedTags = [...selectedTags, tag.id]
                    })
                    return {
                        id: item.id,
                        title: item.title,
                        status: item.status,
                        priority: item.priority,
                        editDisabled: true,
                        selected_tags: selectedTags
                    }
                })

            }
        })
    }
    //удаление
    onDelete = (id) => {
        let isConfirm = confirm("Удалить?");
        if (isConfirm) {
            deleteItem(id)
            this.getAll()
        }
    }
    /*--- Все что связано с тегами ---*/
    //получение
    getAllTags = () => {
        getTags().then(data => {
            this.setState({
                    tag_title: '',
                    tags: [...data],
                    selected_tags: [],
                },
                () => {
                    console.log(this.state.tags)
                })
        })
    }
    //отправка
    onSubmitTag = () => {
        addTag(this.state.tag_title).then(() => {
            this.getAllTags()
        })
        this.setState({
            tag_title: '',
        })
    }
    //обновление
    onUpdateTag = () => {
        updateTag(this.state.tag_title, this.state.tag_id).then(() => {
            this.getAllTags();
        })
        this.setState({
            tag_title: '',
            editTagDisabled: '',
        })
        this.getAllTags()
        this.getAll()
    }
    // редактирование
    onEditTag = (itemId) => {
        let data = [...this.state.tags]
        data.forEach((item, index) => {
            if (item.id === itemId) {
                this.setState({
                    tag_id: item.id,
                    tag_title: item.title,
                    editTagDisabled: true,
                })
            }
        })
    }
    //удаление
    onDeleteTag = (id) => {
        deleteTag(id)
        this.getAll()
        this.getAllTags()
    }
    //переключение при нажатии
    onToggleTag = (id) => {
        const tags = this.state.selected_tags;
        const idx = tags.findIndex((el) => el === id);
        if (idx === -1) {
            this.setState(({selected_tags}) => {
                const newData = [...selected_tags, id]
                return {
                    selected_tags: newData
                }
            })
        } else {
            this.setState(({selected_tags}) => {
                const before = selected_tags.slice(0, idx);
                const after = selected_tags.slice(idx + 1);
                const newData = [...before, ...after]
                return {
                    selected_tags: newData
                }
            })
        }
    }

    /*--- Все что связано с поиском и фильтрацией ---*/
    search(items, term = 0) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.title.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }

    onSearching = (term) => {
        this.setState({term})
    }
    onFilterChange = (filter) => {

        this.setState({filter})
    }

    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'low':
                return items.filter((item) => (item.priority === 0))
            case 'middle':
                return items.filter((item) => (item.priority === 1))
            case 'hight':
                return items.filter((item) => (item.priority === 2))
            default:
                return items;
        }
    }

    render() {
        const {priority, status, title, editDisabled, items, filter, term, tag_title, editTagDisabled, tags, selected_tags} = this.state;
        const visibleItems = this.filter(this.search(items, term), filter);

        return (
            <div className="container col-md-6 mx-auto mb-5">
                <div className="row">
                    <div className="">
                        <h1>Задачи</h1>
                    </div>
                </div>
                <ErrorBoundary>
                    <CreateTask
                        priority={priority}
                        status={status}
                        title={title}
                        editDisabled={editDisabled}
                        tag_title={tag_title}
                        editTagDisabled={editTagDisabled}
                        tags={tags}
                        selected_tags={selected_tags}
                        onSubmitTag={this.onSubmitTag}
                        onUpdateTag={this.onUpdateTag}
                        onDeleteTag={this.onDeleteTag}
                        onEditTag={this.onEditTag}
                        onToggleTag={this.onToggleTag}
                        onUpdate={this.onUpdate}
                        onSubmit={this.onSubmit}
                        onChange={this.onChange}
                    />
                    <ErrorButton/>
                </ErrorBoundary>
                <div className="row">
                    <div className="col-12  col-md-12 mb-2 mt-3">
                        <SearchPanel
                            onSearching={this.onSearching}
                        />
                    </div>
                    <div className="col-12 col-md-12 mb-2 mt-3">
                        <ItemStatusFilter
                            filter={filter}
                            onFilterChange={this.onFilterChange}
                        />
                    </div>
                </div>
                <ErrorBoundary>
                    <TodoList
                        todos={visibleItems}
                        onDelete={this.onDelete}
                        onEdit={this.onEdit}
                        editDisabled={editDisabled}
                    />
                </ErrorBoundary>
            </div>
        )
    }
}
