import Field from "./Field"
import Button from "./Button"

const AddTaskForm = (props) => {
    const {
        addTask,
        setNewTaskItem,
        newTaskItem,
    } = props

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