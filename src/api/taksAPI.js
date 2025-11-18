const URL = 'http://localhost:3001/tasks'
const headers = {
    'Content-Type': 'application/json',
}
const tasksAPI = {
    getALL: () => {
        return fetch(URL)
            .then((response) => response.json())
    },

    add: (task) => {
        return fetch(URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(task),
        })
            .then((response) => response.json())
    },

    deleteAll: (tasks) => {
        return Promise.all(
            tasks.map(({ id }) => {
                return tasksAPI.delete(id)
            })
        )
    },

    delete: (id) => {
        return fetch(`${URL}/${id}`, {
            method: 'DELETE',
        })
    },

    toggleComplete: (id, isDone) => {
        return fetch(`${URL}/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ isDone }),
        })
    },
}

export default tasksAPI