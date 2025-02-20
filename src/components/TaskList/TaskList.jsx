import React from 'react';
import TaskItem from '../TaskItem/TaskItem'; 

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  return (
    <div className="task-list">
      <h2>Task List</h2>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
      ))}
    </div>
  );
};

export default TaskList;
