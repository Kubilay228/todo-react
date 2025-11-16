import { createContext, useState, useEffect, useCallback, useMemo, useRef } from "react";

export const TaskContext = createContext({})

export const TaskProvider = (props) => {
    const { children } = props

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks')

        if (savedTasks) {
            return JSON.parse(savedTasks)
        }

        return [
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
        ]
    })

    const newTaskInputRef = useRef(null)
    const firstIncompleteTaskRef = useRef(null)
    const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id

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
        localStorage.setItem('tasks', JSON.stringify(tasks))
    },
        [tasks])
    useEffect(() => { newTaskInputRef.current.focus() }, [])


    return (
        <TaskContext.Provider
            value={{
                tasks,
                filteredTasks,
                firstIncompleteTaskRef,
                firstIncompleteTaskId,
                deleteTask,
                toggleTaskComplete,
                deleteAllTasks,

                newTaskItem,
                setNewTaskItem,
                searchQuery,
                setSearchQuery,
                newTaskInputRef,
                addTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}