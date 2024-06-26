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

  const handleEdit = (task) => {
    setCurrentTask(task);
    console.log(task)
};

  return (
    <div className="App">
      <AddTask fetchTasks={fetchTasks}/>
      <TaskList tasks={tasks} currentTask={currentTask}  onEdit={handleEdit} fetchTasks={fetchTasks}/>
    </div>
  );
}

export default App;
