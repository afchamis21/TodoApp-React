import { ref, remove, set } from "firebase/database"
import { X } from "phosphor-react"
import database from "../../../firebase"
import { Todo } from "../../entities/todo"
import'./styles.modules.css'

interface TodoModalProps {
    modalProps: Todo,
    setTodoModalOpen: (open: boolean) => void
}

export default function TodoModal({modalProps, setTodoModalOpen}: TodoModalProps) {
    function updateTodoStatus(){
        const newTodo: Todo = {
            ...modalProps,
        }
        newTodo.completed ? reopenTodo(newTodo) : finishTodo(newTodo)
        setTodoModalOpen(false)
    }

    function reopenTodo(todo: Todo){
        todo.completed = false
        set(ref(database, 'openTodos/' + todo.id), todo)
        remove(ref(database, 'completedTodos/' + todo.id))
    }

    function finishTodo(todo: Todo){
        todo.completed = true
        todo.finished_at = new Date().toLocaleString('pt-BR').split(' ')[0]
        set(ref(database, 'completedTodos/' + todo.id), todo)
        remove(ref(database, 'openTodos/' + todo.id))
    }

    function deleteTodo(){
        remove(ref(database, 'completedTodos/' + modalProps.id))
        setTodoModalOpen(false)
    }
    return (
        <>
            <div className="todoModal_container">
            <div className="todoModal" >
                <button className="closeButton" onClick={()=>{setTodoModalOpen(false)}}><X size={32} /></button>
                <h2>{modalProps.title}</h2>
                <p>{modalProps.description}</p>
                <div className="info">
                    <time>Criado em: {modalProps.created_at}</time>
                    {modalProps.completed ? <p>Concluído</p> : <p>Pendente</p>}
                    {modalProps.completed && <time>Concluído em: {modalProps.finished_at}</time>}
                </div>
                <div className="buttons">
                <button className={modalProps.completed ? 'todoButton reopen_todoButton' : 'todoButton complete_todoButton'} onClick={()=>{updateTodoStatus()}}>{modalProps.completed ? 'Reabrir Todo' : 'Concluir Todo'}</button>
                {modalProps.completed && <button className="deleteTodoButton" onClick={()=>{deleteTodo()}}>Deletar Todo</button>}
                </div>
            </div>
            </div>
        </> 
)}
