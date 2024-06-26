import React from 'react';
import "./todoitem.css";
function TodoItem({ task, currentTask, onEdit, deleteTask }) {
    /* function handleChange() {
        toggleCompleted(task.id);
    } */

    return (
        <li key={task.id} className="todo__item">
            {/* TODO: Add edit function, get value of input text value and let update func work */}
            {(currentTask === task.id) ? <input type="text" defaultValue={task.title} onChange={(e)=> {}} required />
                : <p>{task.title}</p>}

            <p>{task.description}</p>
            <div className='button__container'>
                <button onClick={() => deleteTask(task.id)}>
                    X
                </button>
                <button onClick={() =>  {currentTask ? onEdit(null,[task.title,task.description]) : onEdit(task.id,[])}}>
                {(currentTask === task.id) ? 'Update Task' : 'Add Task'}
                </button>
            </div>

        </li>
    );
}
export default TodoItem;
