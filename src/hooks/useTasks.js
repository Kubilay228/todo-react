import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import tasksAPI from '../api/taksAPI'

const useTasks = () => {
    const [tasks, setTasks] = useState([])

    const newTaskInputRef = useRef(null)

    const [newTaskItem, setNewTaskItem] = useState('')
    const [searchQuery, setSearchQuery] = useState('')


    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm('Are you sure want to delete all?')

        if (isConfirmed) {
            tasksAPI.deleteAll(tasks).then(() => setTasks([]))
        }
    }, [tasks])

    const deleteTask = useCallback((taskId) => {
        tasksAPI.delete(taskId).then(() => {
            setTasks(tasks.filter((task) => task.id !== taskId))
        })
    }, [tasks])

    const toggleTaskComplete = useCallback((taskId, isDone) => {
        tasksAPI.toggleComplete(taskId, isDone).then(() => {
                setTasks(tasks.map(task =>
                    task.id === taskId ? { ...task, isDone } : task
                ))
            })
    }, [tasks])

    const addTask = useCallback((title) => {
        const newTask = {
            title,
            isDone: false,
        }

        tasksAPI.add(newTask).then((addedTask) => {
            setTasks((prevTasks) => [...prevTasks, addedTask])
            setNewTaskItem('')
            setSearchQuery('')
            newTaskInputRef.current.focus()
        })
    })



    const filteredTasks = useMemo(() => {
        const cleanSearhQuery = searchQuery.trim().toLowerCase()
        return cleanSearhQuery.length > 0 ? tasks.filter(({ title }) => title.toLowerCase().includes(cleanSearhQuery)) : null
    }, [searchQuery, tasks])

    useEffect(() => {
        newTaskInputRef.current.focus()

        tasksAPI.getALL().then(setTasks)
    }, [])

    return {
        tasks,
        filteredTasks,
        deleteTask,
        toggleTaskComplete,
        deleteAllTasks,

        newTaskItem,
        setNewTaskItem,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
    }
}

export default useTasks