import TodoItem from "./TodoItem"

const TodoList = (props) => {
    const {
        filteredTasks,
        tasks = [],
        onDeleteTaskButtonClick,
        ontaskCompleteChange,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
    } = props

    const hasTask = tasks.length > 0
    const isEmptyFilteredTasks = filteredTasks?.length === 0

    if (!hasTask) {
        return (<div className="todo__empty-message">There are no task yet</div>)
    }

    if (hasTask && isEmptyFilteredTasks) {
        return (<div className="todo__empty-message">Task not found</div>)
    }

    return (
        <ul className="todo__list">
            {(filteredTasks ?? tasks).map((task) => (
                <TodoItem
                    className='todo__item'
                    key={task.id}
                    {...task}
                    ref={task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
                    onDeleteTaskButtonClick={onDeleteTaskButtonClick}
                    ontaskCompleteChange={ontaskCompleteChange}
                />
            ))}
        </ul>
    )
}

export default TodoList