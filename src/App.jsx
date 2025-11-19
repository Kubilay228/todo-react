import TasksPage from "./pages/tasksPage"
import TaskPage from "./pages/taskPage"
import Router from "./Router"

const App = () => {
  const routes = {
    '/': TasksPage,
    '/tasks/:id': TaskPage,
    '*': () => <div>404</div>
  }
  return (
    <Router routes={routes} />
  )
}

export default App
