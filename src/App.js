import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './Components/TaskList';
import AddTask from './Components/AddTask';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  };

  const handleEdit = (task,[title, description,status='pending'])=> {
    if (currentTask){
      axios.put(`http://localhost:5000/tasks/${currentTask}`, { title, description, status })
          .then(response => {
              console.log('Task updated:', response.data);
              fetchTasks();
          })
          .catch(error => console.error('Error updating task:', error));
  }
    setCurrentTask(task);
    console.log(task)
};

  return (
    <div className="App">
      <h1>TASK MANAGER</h1>
      <AddTask fetchTasks={fetchTasks}/>
      <TaskList tasks={tasks} currentTask={currentTask}  onEdit={handleEdit} fetchTasks={fetchTasks}/>
    </div>
  );
}

export default App;
