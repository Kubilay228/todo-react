import Field from "./Field"
import Button from "./Button"

const AddTaskForm = () => {
    return (
        <form className="todo__form">
            <Field
                label='New task'
                className='todo__field'
                id='new-task'
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