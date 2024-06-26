import React from 'react';
import "./todoitem.css";
function TodoItem({ task, currentTask, onEdit, deleteTask }) {
    /* function handleChange() {
        toggleCompleted(task.id);
    } */

    return (
        <li key={task.id} className="todo__item">

            {(currentTask === task.id) ? <input type="text" defaultValue={task.title}  required />
                : <p>{task.title}</p>}

            <p>{task.description}</p>
            <div className='button__container'>
                <button onClick={() => deleteTask(task.id)}>
                    X
                </button>
                <button onClick={() =>  onEdit(task.id)}>
                'Edit'
                </button>
            </div>

        </li>
    );
}
export default TodoItem;
