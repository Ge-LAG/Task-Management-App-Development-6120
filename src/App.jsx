import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      ...task,
      createdAt: new Date().toISOString(),
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
    setShowTaskForm(false);
  };

  const updateTask = (updatedTask) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed) ||
      (filter === 'high' && task.priority === 'high') ||
      (filter === 'medium' && task.priority === 'medium') ||
      (filter === 'low' && task.priority === 'low');

    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex">
          <Sidebar 
            filter={filter}
            setFilter={setFilter}
            onAddTask={() => {
              setEditingTask(null);
              setShowTaskForm(true);
            }}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            tasksCount={{
              total: tasks.length,
              completed: tasks.filter(t => t.completed).length,
              pending: tasks.filter(t => !t.completed).length
            }}
          />
          
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={
                <Dashboard 
                  tasks={tasks}
                  onAddTask={() => {
                    setEditingTask(null);
                    setShowTaskForm(true);
                  }}
                />
              } />
              <Route path="/tasks" element={
                <TaskList
                  tasks={filteredTasks}
                  onToggleComplete={toggleTaskComplete}
                  onEditTask={handleEditTask}
                  onDeleteTask={deleteTask}
                  filter={filter}
                />
              } />
            </Routes>
          </main>
        </div>

        <AnimatePresence>
          {showTaskForm && (
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? updateTask : addTask}
              onClose={() => {
                setShowTaskForm(false);
                setEditingTask(null);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;