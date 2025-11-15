import { useEffect, useRef, useState } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from './SearchTaskForm'
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"
import Button from "./Button"

const Todo = () => {

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
    const firstIncompleteTaskId = tasks.find(({isDone})=>!isDone)?.id

    const [newTaskItem, setNewTaskItem] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    

    const deleteAllTasks = () => {
        const isConfirmed = confirm('Are you sure want to delete all?')
        if (isConfirmed) {
            setTasks([])
        }
    }

    const deleteTask = (taskId) => {
        setTasks(
            tasks.filter((task) => task.id !== taskId)
        )
    }

    const toggleTaskComplete = (taskId, isDone) => {
        setTasks(
            tasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, isDone }
                }

                return task
            })
        )
    }

    const addTask = () => {
        if (newTaskItem.trim().length > 0) {
            const newTask = {
                title: newTaskItem,
                id: crypto?.randomUUID() ?? Date.now().toString(),
                isDone: false,
            }

            setTasks([...tasks, newTask])
            setNewTaskItem('')
            setSearchQuery('')
            newTaskInputRef.current.focus()
        }
    }

    const cleanSearhQuery = searchQuery.trim().toLowerCase()
    const filteredTasks = cleanSearhQuery.length > 0 ? tasks.filter(({ title }) => title.toLowerCase().includes(cleanSearhQuery)) : null

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    },
        [tasks])
    useEffect(() => { newTaskInputRef.current.focus() }, [])

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTask={addTask}
                newTaskItem={newTaskItem}
                setNewTaskItem={setNewTaskItem}
                newTaskInputRef={newTaskInputRef}
            />
            <SearchTaskForm
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <TodoInfo
                total={tasks.length}
                done={tasks.filter(({ isDone }) => isDone).length}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <Button
                onClick={()=>firstIncompleteTaskRef.current?.scrollIntoView({behavior:'smooth'})}
            >
                Show firs incomplete task
            </Button>
            <TodoList
                filteredTasks={filteredTasks}
                tasks={tasks}
                onDeleteTaskButtonClick={deleteTask}
                ontaskCompleteChange={toggleTaskComplete}
                firstIncompleteTaskId={firstIncompleteTaskId}
                firstIncompleteTaskRef={firstIncompleteTaskRef}
            />
        </div>
    )
}

export default Todo