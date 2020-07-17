import axios from 'axios';

const link = 'http://127.0.0.1:8000';
export const getList = () => {
    return axios
        .get(link+`/api/tasks`, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(res=> {
            return res.data
        })
}

export const addItem = (title,status, priority, tags) => {
    return axios
        .post(link+'/api/task',
            {
                title: title,
                status: status,
                priority: priority,
                tags: tags
            },
            {
                headers: {'Content-Type': 'application/json'}
            })
        .then(res=> {
            console.log(res)
        })
}
export const deleteItem = id => {
    axios.delete(link+`/api/task/${id}`, {
        headers: {'Content-Type': 'application/json'}
    })
        .then(res=> {
            console.log(res)
        })
        .catch(err=> {
            console.log(err)
        })
}
export const updateItem = (title,status, priority, tags, id) => {
    return axios.put(link+`/api/task/${id}`, {
            title: title,
            status: status,
            priority: priority,
            tags: tags
        },
        {
        headers: {'Content-Type': 'application/json'}
        })
        .then(res=> {
            console.log(res)
        })
        .catch(err=> {
            console.log(err)
        })
}