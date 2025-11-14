import TodoItem from "./TodoItem"

const TodoList = (props) => {
    const {
        tasks = [],
        onDeleteTaskButtonClick,
        ontaskCompleteChange,
    } = props

    const hasTask = true

    if (!hasTask) {
        return (<div className="todo__empty-message"></div>)
    }

    return (
        <ul className="todo__list">
            {tasks.map((task) => (
                <TodoItem
                    className='todo__item'
                    key={task.id}
                    {...task}
                    onDeleteTaskButtonClick={onDeleteTaskButtonClick}
                    ontaskCompleteChange={ontaskCompleteChange}
                />
            ))}
        </ul>
    )
}

export default TodoList