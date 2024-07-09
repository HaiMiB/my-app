import React, { useState} from 'react';
import "./todoitem.css";
function TodoItem({ task, currentTask, onEdit, deleteTask }) {
    /* function handleChange() {
        toggleCompleted(task.id);
    } */
const [input, setInput] = useState(task.title);
const [status, setStatus] = useState(task.status);

    return (
        <li key={task.id} className="todo__item">
            {(currentTask === task.id) ? <input type="text" defaultValue={task.title} onInput={e => setInput(e.target.value)} required /> 
                : <p>{task.title}</p>}
            {console.log(input)}
            <p>{task.description}</p>
            <div className='todo__status'>
                    <label>Status:</label>
                    {(currentTask=== task.id) ? 
                    <select value={status} onChange={(e) => setStatus(e.target.value)} >
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>: <div>{task.status}</div>}
                </div>
            <div className='button__container'>
                <button onClick={() => deleteTask(task.id)}>
                    X
                </button>
                <button onClick={() =>  {currentTask ? onEdit(null,[input,task.description,status]) : onEdit(task.id,[])}}>
                {(currentTask === task.id) ? 'Update Task' : 'Edit'}
                </button>
            </div>

        </li>
    );
}
export default TodoItem;
