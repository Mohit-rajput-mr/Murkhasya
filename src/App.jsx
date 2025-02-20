import { useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from './assets/image.png';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false, alarmPlayed: false }]);
    toast.success('Task added successfully!');
  };

  const updateTask = (id, updatedFields) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedFields } : task)));
    toast.info('Task updated!');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.error('Task deleted!');
  };

  return (
    <div className="app">
      <img src={img} alt="" className='logo'/>
      <h1>To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
      <ToastContainer />
    </div>
  );
}

export default App;
