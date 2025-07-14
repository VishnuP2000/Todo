import { useEffect, useRef, useState } from "react";
import TodoIcon from "../assets/sticky-note.png";
import ToDoItems from "./TodoItems";

const Todo = () => {

    
    

    const [todolist, setTodolist] = useState(() => {

        const savedTasks = localStorage.getItem("tasks");
    
        return savedTasks ? JSON.parse(savedTasks):[];
    
     });
     const [date,setDate]=useState(()=>{
        const saveDate=localStorage.getItem('date');
        return saveDate ? JSON.parse(saveDate):'';

     })

     const addDate=(e)=>{
        const newDate=e.target.value;
        console.log('date2')
        setDate(newDate)
        localStorage.setItem('date',JSON.stringify(newDate))
     }

    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();
    
        if (inputText === "") {
            alert('Input field is empty');
            return;
        }
    
        // Check for duplicate task
        const isDuplicate = todolist.some((todo) => todo.text.toLowerCase() === inputText.toLowerCase());
        
        if (isDuplicate) {
            alert('input is already exists!');
            return;
        }
    
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
            isEditing: false
        };
    
        setTodolist((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
    };

    const deleteTodo=(id)=>{
        console.log(id,'idddd')
        setTodolist((prvTodo)=>{
         return  prvTodo.filter((todo)=> todo.id !== id)
        })
    }
    const Togle=(id)=>{
        setTodolist((prvTodoos)=>{
            return prvTodoos.map((todoo)=>{
                if(todoo.id==id){
                    // inputRef.current.value=todoo.text
                    return {...todoo,isComplete:!todoo.isComplete}
                }
                return todoo;
            })
        })
    }
    
    useEffect(()=>{
        localStorage.setItem("tasks", JSON.stringify(todolist));
    },[todolist])
    



    const Edit = (id, newText) => {
        setTodolist((editTodoo) =>
            editTodoo.map((todoEdit) =>
                todoEdit.id === id ? { ...todoEdit, text: newText, isEditing: false } : todoEdit
            )
        );
    };
    const togleEditMode=(id)=>{
        setTodolist((editTodoo)=>
        editTodoo.map((tood)=>
        tood.id===id? {...tood,isEditing: !tood.isEditing}: tood
    )
        );
    }

    return (
        <div className="bg-slate-950 place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
            {/* ------ Title ------------ */}
       {/* data */}
            <input onChange={addDate} value={date} className="mr-72 font-serif " type="date" />
            <div className="flex pl-20 mt-7 gap-2 ">
                <img className="w-8" src={TodoIcon} alt="Todo Icon" />
                <h1 className="text-3xl font-semibold text-white">To-Do List</h1>
            </div>

            {/* ------------- Input Box ---------------- */}
            <div className="flex items-center my-7 bg-gray-200 rounded-full">
               
                <input 
                    ref={inputRef} 
                    className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
                    type="text"
                    placeholder="Enter a task..."
                />
                <button 
                    className="border-none rounded-full h-14 bg-cyan-400 w-32 text-white text-lg font-medium cursor-pointer" 
                    onClick={add}
                >
                    Add Task
                </button>
            </div>

            {/* ------------- Todo List ---------------- */}
            <div>
                {todolist.map((item) => (
                    <ToDoItems 
                    key={item.id} 
                    text={item.text} 
                    itemId={item.id} 
                    isComplete={item.isComplete} 
                    isEditing={item.isEditing}  // ✅ Pass isEditing
                    deleteTodo={deleteTodo} 
                    Togle={Togle} 
                    Edit={Edit}  // ✅ Pass Edit function correctly
                    togleEditMode={togleEditMode} 
                    seter={deleteTodo} 
                    className="text-white" 
        />
                ))}
            </div>
        </div>
    );
};

export default Todo;