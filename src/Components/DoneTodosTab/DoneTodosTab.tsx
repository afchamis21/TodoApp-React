import { child, get, ref, set } from 'firebase/database'
import { CircleNotch } from 'phosphor-react'
import { useEffect, useState } from 'react'
import database from '../../../firebase'
import { Todo } from '../../entities/todo'
import TodoModal from '../TodoModal/TodoModal'
import'./styles.modules.css'

export default function DoneTodosTab() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [todoModalOpen, setTodoModalOpen] = useState(false)
  const [modalProps, setModalProps] = useState<Todo>({})


  function handleNewTodo(){
    const newTodo: Todo = {
        id: 'teste 2',
        title: 'Novo Todo',
        description: 'Esse é um novo todo',
        completed: false,
        created_at: new Date().toLocaleString('pt-BR').split(' ')[0],
    }
    set(ref(database, 'openTodos/' + newTodo.id), newTodo)
    setTodos([...todos, newTodo])
  }

  useEffect(()=> {
    const todo_list: Todo[] = []
    get(child(ref(database), 'completedTodos')).then((snapshot)=>{
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
      }) : <p>Nenhum todo finalizado</p>}
      </div>
    }
  </>
    
  )
}