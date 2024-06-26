import React, { useState } from 'react';
import "./addtask.css";
import axios from 'axios';

const AddTask = ({fetchTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');

    const handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post('http://localhost:5000/tasks', { title, description, status }, config)
            .then(response => {
                console.log('Task added:', response.data);
                fetchTasks();
                resetForm();
            })
            .catch(error => console.error('Error adding task:', error));

    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setStatus('pending');
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Task</h2>
            <div className='addtask__template'>
                <div className='addtask__title'>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className='addtask__description'>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className='addtask__status'>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="completed">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>
            <button type="submit">Add Task</button>

        </form>
    );
};

export default AddTask;
