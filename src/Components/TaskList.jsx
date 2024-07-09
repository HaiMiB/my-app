import React, { useState, useEffect } from 'react';
import "./tasklist.css";
import axios from 'axios';
import TodoItem from './ToDoItem';

const TaskList = ({tasks, currentTask, onEdit, fetchTasks}) => {
    

    function deleteTask(id) {
        axios.delete(`http://localhost:5000/tasks/${id}`)
            .then(response => {
                console.log('Task deleted:',response.data);
                fetchTasks();
            })
            .catch(error => {
                console.error('Error:', error.message);
            });

    }

    return (
        <div className='task__list'>
            <h2>Task List</h2>
            <ul>
                {tasks.map(task => (
                    <TodoItem key={task.id} task={task} currentTask={currentTask}  onEdit={onEdit} deleteTask={deleteTask}  ></TodoItem>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
