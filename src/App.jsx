
import ToDoList from "./components/ToDoList"
import TodoItem from "./components/TodoItems"
function App() {
 
  return (
    <div className="bg-stone-900 grid py-10 min-h-screen">
      <ToDoList></ToDoList>
      {/* <TodoItem></TodoItem> */}
    </div>
  )
}


export default App
