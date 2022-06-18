import { Todo } from '../../entities/todo'
import'./styles.modules.css'
import { child, get, onValue, ref, set } from 'firebase/database'
import { useEffect, useState } from 'react'

import database from '../../../firebase'
import { CircleNotch } from 'phosphor-react'
import TodoModal from '../TodoModal/TodoModal'

interface OpenTodosTabProps{
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
}

export default function OpenTodosTab({todos, setTodos}: OpenTodosTabProps) {
  const [loading, setLoading] = useState(true)
  const [todoModalOpen, setTodoModalOpen] = useState(false)
  const [modalProps, setModalProps] = useState<Todo>({})
  
  useEffect(()=> {
    const todo_list: Todo[] = []
    get(child(ref(database), 'openTodos')).then((snapshot)=>{
      for (const key in snapshot.val()) {
        todo_list.push(snapshot.val()[key])
      }
      setTodos(todo_list)
      setLoading(false)
    })
  }, [todoModalOpen])

  return (
    todoModalOpen ? 
  <TodoModal modalProps={modalProps} setTodoModalOpen={setTodoModalOpen} />
  :
  <>
    {
      loading ?
      <div className="openTodosBody_loading">
        <CircleNotch size={96} className='loading_icon'/>
      </div>
      :
      <div  className="openTodosBody_loaded">
      {todos.length > 0 ? todos.map((todo, index) => {
        return (
            <a key={index} className='card' onClick={()=>{
              setTodoModalOpen(true)
              setModalProps(todo)
            }}>
              <h2>{todo.title}</h2>
            </a>
        )
      }) : <p>Nenhum todo aberto</p>}
      </div>
    }
  </>
    
  )
}