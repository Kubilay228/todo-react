import Field from "./Field"
import Button from "./Button"
import { useContext } from "react"
import { TaskContext } from "../context/TaskContext"

const AddTaskForm = () => {
    const {
        addTask,
        setNewTaskItem,
        newTaskItem,
        newTaskInputRef,
    } = useContext(TaskContext)

    return (
        <form className="todo__form"
            onSubmit={(e) => {
                e.preventDefault()
                addTask()
            }}
        >
            <Field
                label='New task'
                className='todo__field'
                id='new-task'
                addTask={addTask}
                value={newTaskItem}
                onInput={(e) => setNewTaskItem(e.target.value)}
                ref={newTaskInputRef}
            />
            <Button
                type='submite'
            >
                Add
            </Button>
        </form>
    )
}

export default AddTaskForm