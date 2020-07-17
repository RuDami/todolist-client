import axios from 'axios';

const link = 'http://127.0.0.1:8000';
export const getTags = () => {
    return axios
        .get(link+'/api/tags', {
            headers: {'Content-Type': 'application/json'}
        })
        .then(res=> {
            return res.data
        }).catch(err=> {
            console.log(err)
        })
}

export const addTag = (title) => {
    return axios
        .post(link+'/api/tag',
            {
                title: title
            },
            {
                headers: {'Content-Type': 'application/json'}
            })
        .then(res=> {
            console.log(res)
        }).catch(err=> {
            console.log(err)
        })
}
export const deleteTag = id => {
    axios.delete(link+`/api/tag/${id}`, {
        headers: {'Content-Type': 'application/json'}
    })
        .then(res=> {
            console.log(res)
        })
        .catch(err=> {
            console.log(err)
        })
}
export const updateTag = (title, id) => {
    return axios.put(link+`/api/tag/${id}`, {
            title: title
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