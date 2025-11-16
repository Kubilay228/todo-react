import { useContext } from "react"
import Field from "./Field"
import { TaskContext } from "../context/TaskContext"

const SearchTaskForm = () => {
    const {
        searchQuery,
        setSearchQuery,
    } = useContext(TaskContext)

    return (<form className="todo__form" onSubmit={(e)=>e.preventDefault()}>
        <Field
            className='todo__field'
            label='Search task'
            id='search-task'
            type='search'
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.target.value)}
        />
    </form>)
}

export default SearchTaskForm