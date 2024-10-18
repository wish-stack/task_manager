import React, { useState } from 'react';
import './App.css';


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [priorityInput, setPriorityInput] = useState('Medium');
  const [dueDateInput, setDueDateInput] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortOption, setSortOption] = useState('Priority');


  const handleAddTask = () => {
    if (taskInput.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskInput,
        completed: false,
        priority: priorityInput,
        dueDate: new Date(dueDateInput),
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
      setDueDateInput('');
    }
  };


  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };


  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };


  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };


  const filteredTasks = tasks.filter(task => {
    if (filterStatus === 'Completed') {
      return task.completed;
    }
    if (filterStatus === 'Incomplete') {
      return !task.completed;
    }
    return true;
  });


  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOption === 'Priority') {
      const priorities = { High: 1, Medium: 2, Low: 3 };
      return priorities[a.priority] - priorities[b.priority];
    }
    if (sortOption === 'Due Date') {
      return a.dueDate - b.dueDate;
    }
    return 0;
  });


  return (
    <div className="app">
      <h1>Task Manager</h1>
      <input
        type="text"
        placeholder="Task..."
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <select
        value={priorityInput}
        onChange={(e) => setPriorityInput(e.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="date"
        value={dueDateInput}
        onChange={(e) => setDueDateInput(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>


      <h2>Filter by Status</h2>
      <select value={filterStatus} onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Incomplete">Incomplete</option>
      </select>


      <h2>Sort by</h2>
      <select value={sortOption} onChange={handleSortChange}>
        <option value="Priority">Priority</option>
        <option value="Due Date">Due Date</option>
      </select>


      <h2>Tasks</h2>
      <ul>
        {sortedTasks.map(task => (
          <li key={task.id}>
            <span className={task.completed ? 'completed' : ''}>
              {task.text} (Priority: {task.priority}, Due: {task.dueDate.toLocaleDateString()})
            </span>
            <button onClick={() => handleToggleComplete(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default App;