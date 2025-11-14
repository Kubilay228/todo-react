import { useState } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from './SearchTaskForm'
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"

const Todo = () => {
    const [tasks, setTasks] = useState([
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

    const [newTaskItem, setNewTaskItem] = useState('')

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

    const filterTasks = (query) => {
        console.log(`Поиск ${query}`)
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
        }
    }

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTask={addTask}
                newTaskItem={newTaskItem}
                setNewTaskItem={setNewTaskItem}
            />
            <SearchTaskForm onSearchInput={filterTasks} />
            <TodoInfo
                total={tasks.length}
                done={tasks.filter(({ isDone }) => isDone).length}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <TodoList
                tasks={tasks}
                onDeleteTaskButtonClick={deleteTask}
                ontaskCompleteChange={toggleTaskComplete}
            />
        </div>
    )
}

export default Todo