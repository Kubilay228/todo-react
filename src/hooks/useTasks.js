import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import useTasksLocalStorage from './useTasksLocalStorage'

const useTasks = () => {
    const { saveTasks, savedTasks } = useTasksLocalStorage()

    const [tasks, setTasks] = useState(savedTasks ?? [
        {
            title: 'Купить молоко',
            id: 'task-1',
            isDone: false,
        },
        {
            title: 'Погладить кота',
            id: 'task-2',
            isDone: true,
        }
    ])

    const newTaskInputRef = useRef(null)

    const [newTaskItem, setNewTaskItem] = useState('')
    const [searchQuery, setSearchQuery] = useState('')


    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm('Are you sure want to delete all?')
        if (isConfirmed) {
            setTasks([])
        }
    }, [])

    const deleteTask = useCallback((taskId) => {
        setTasks(
            tasks.filter((task) => task.id !== taskId)
        )
    }, [tasks])

    const toggleTaskComplete = useCallback((taskId, isDone) => {
        setTasks(
            tasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, isDone }
                }

                return task
            })
        )
    }, [tasks])

    const addTask = useCallback(() => {
        if (newTaskItem.trim().length > 0) {
            const newTask = {
                title: newTaskItem,
                id: crypto?.randomUUID() ?? Date.now().toString(),
                isDone: false,
            }

            setTasks((prevTasks) => [...prevTasks, newTask])
            setNewTaskItem('')
            setSearchQuery('')
            newTaskInputRef.current.focus()
        }
    }, [newTaskItem,])

    const filteredTasks = useMemo(() => {
        const cleanSearhQuery = searchQuery.trim().toLowerCase()
        return cleanSearhQuery.length > 0 ? tasks.filter(({ title }) => title.toLowerCase().includes(cleanSearhQuery)) : null
    }, [searchQuery, tasks])

    useEffect(() => {
        saveTasks(tasks)
    },
        [tasks])
    useEffect(() => { newTaskInputRef.current.focus() }, [])

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