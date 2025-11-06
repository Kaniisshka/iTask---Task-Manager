import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { v4 as uuidv4 } from 'uuid';




function App() {

  const [todo, setTodo] = useState("")

  const [todos, setTodos] = useState([])

  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  
    
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  
  

  const toggleFinish = (e) =>{
    setshowFinished(!showFinished)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleDelete = (e, id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      setTodos(todos.filter(item => item.id !== id))
      saveToLS()
    }
    

  }

  const handleEdit = (e,id) => {
    let  t = todos.filter(i => i.id == id)
    setTodo(t[0].todo)
    setTodos(todos.filter(item => item.id !== id))
    saveToLS()
    
  }

  const handleChange = (e) => {

    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto rounded-xl my-6 px-5 py-7 bg-blue-100 min-h-[80vh] w-1/2" >
      <h1 className='font-bold text-center text-xl '>iTask - Manage your Tasks at one place</h1>
      <h2 className='text-lg font-bold mt-5'>Add a Task</h2>
        <div className="addTodo mb-5 flex flex-col gap-3 items-center">
          

          <input onChange={handleChange} value={todo} type="text" className='bg-white rounded-md w-full py-1 px-1' />
          <button  onClick={handleAdd} disabled={todo.length<=3} className='bg-blue-500 hover:bg-blue-900 p-3 py-1 text-white rounded-md mx-6 font-bold text-sm w-fit'>Save </button>
        </div>
        <input  onChange={toggleFinish} type="checkbox" checked = {showFinished} className='accent-blue-500 mb-2' /> Show Finished
        <h2 className='text-lg font-bold'>Your Tasks</h2>
        <div className="todos">
          {todos.length === 0 && <div className='font-bold my-5 text-white bg-blue-500 px-4 rounded-md max-w-fit '>No Task Left!!!</div>}
          {todos.map(item => {



            return(showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/4 my-3 justify-between">
              
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} className='accent-blue-500' />
                <div>{item.todo}</div>

              </div>

              <div className="buttons flex h-full">
                <button onClick={(e) => {handleEdit(e, item.id)}} className='bg-blue-500 hover:bg-blue-900 p-3 py-1 text-white rounded-md mx-1 font-bold text-sm'>Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-blue-500 hover:bg-blue-900 p-3 py-1 text-white rounded-md mx-1 font-bold text-sm'>Delete</button>
              </div>

            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App



