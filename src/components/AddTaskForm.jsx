import Field from "./Field"
import Button from "./Button"
import { useContext, useState } from "react"
import { TaskContext } from "../context/TaskContext"

const AddTaskForm = () => {
    const {
        addTask,
        setNewTaskItem,
        newTaskItem,
        newTaskInputRef,
    } = useContext(TaskContext)
    const [error, setError] = useState('')

    const clearNewTaskTitle = newTaskItem.trim()
    const isNewtaskTitleEmpty = clearNewTaskTitle.length === 0

    const onSubmit = (e) => {
        e.preventDefault()

        if (!isNewtaskTitleEmpty) {
            addTask(clearNewTaskTitle)
        }
    }

    const onInput = (e) => {
        const { value } = e.target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setNewTaskItem(value)
        setError(hasOnlySpaces ? 'The task cannot be empty' : '')
    }

    return (
        <form className="todo__form"
            onSubmit={onSubmit}
        >
            <Field
                label='New task'
                className='todo__field'
                id='new-task'
                addTask={addTask}
                value={newTaskItem}
                error={error}
                onInput={onInput}
                ref={newTaskInputRef}
            />
            <Button
                type='submite'
                isDisabled={isNewtaskTitleEmpty}
            >
                Add
            </Button>
        </form>
    )
}

export default AddTaskForm