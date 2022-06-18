import { ref, set } from "firebase/database"
import { X } from "phosphor-react"
import { useState } from "react"
import database from "../../../firebase"
import { Todo } from "../../entities/todo"
import { v4 as uuidv4 } from "uuid"
import'./styles.modules.css'

interface NewTodoModalProps {
    setNewTodoModalOpen: (open: boolean) => void
}

export default function NewTodoModal({ setNewTodoModalOpen }: NewTodoModalProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    
    function createTodo(){
        const newTodo: Todo = {
            id: uuidv4(),
            title: title,
            description: description,
            completed: false,
            created_at: new Date().toLocaleString('pt-BR').split(' ')[0],
        }
        set(ref(database, 'openTodos/' + newTodo.id), newTodo)
        setNewTodoModalOpen(false)
    }

    return (
        <>
            <div className="todoModal_container">
            <div className="todoModal" >
                <button className="closeButton" onClick={()=>{setNewTodoModalOpen(false)}}><X size={32} /></button>
                <div className="todo_title">
                    <h2>Título:</h2>
                    <input type="text" name="todo_title" id="todo_title" onChange={(e)=>{setTitle(e.target.value)}}/>
                </div>
                <div className="todo_description">
                    <h2>Descrição:</h2>
                    <textarea cols={30} rows={10} name="todo_description" id="todo_description" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                </div>
                <div className="buttons">
                <button className="createTodoButton" onClick={()=>{createTodo()}}>Criar Todo</button>
                </div>
            </div>
            </div>
        </> 
)}
