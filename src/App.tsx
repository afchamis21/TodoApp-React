import { ref, set } from 'firebase/database'
import { useState } from 'react'
import database from '../firebase'
import './App.css'
import DoneTodosTab from './Components/DoneTodosTab/DoneTodosTab'
import NewTodoModal from './Components/NewTodoModal/NewTodoModal'
import OpenTodosTab from './Components/OpenTodosTab/OpenTodosTab'
import { Todo } from './entities/todo'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isDoneTab, setIsDoneTab] = useState(true)
  const [newTodoModalOpen, setNewTodoModalOpen] = useState(false)

  return (
    newTodoModalOpen
    ?
    <NewTodoModal setNewTodoModalOpen={setNewTodoModalOpen}/>
    :
    <>
    <header>
      <div className="navigation_buttons">
        <button onClick={()=>{setIsDoneTab(!isDoneTab)}} disabled={isDoneTab}>Todos Abertos</button>
        <button onClick={()=>{setIsDoneTab(!isDoneTab)}} disabled={!isDoneTab}>Todos Fechados</button>
      </div>
      <button onClick={()=>{setNewTodoModalOpen(true)}} className='new_todo_button'>Novo Todo</button>
    </header>
    <h1 className='title'>Meu Aplicativo de Todo</h1>
    {
        isDoneTab ? 
        <>
          <OpenTodosTab todos={todos} setTodos={setTodos} />
        </>
        : 
        <>
          <DoneTodosTab/>
        </>
      }
  </>
  )  
}