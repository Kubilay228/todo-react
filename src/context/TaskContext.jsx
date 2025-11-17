import { createContext } from "react";
import useTasks from "../hooks/useTasks";
import useIncompleteTaskScroll from "../hooks/useIncompleteScroll";

export const TaskContext = createContext({})

export const TaskProvider = (props) => {
    const { children } = props

    const {
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
    } = useTasks()

    const {
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
    } = useIncompleteTaskScroll(tasks)

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