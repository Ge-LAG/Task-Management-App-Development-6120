import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleComplete, onEditTask, onDeleteTask, filter }) => {
  const getFilterTitle = () => {
    switch (filter) {
      case 'completed': return 'Completed Tasks';
      case 'pending': return 'Pending Tasks';
      case 'high': return 'High Priority Tasks';
      case 'medium': return 'Medium Priority Tasks';
      case 'low': return 'Low Priority Tasks';
      default: return 'All Tasks';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">{getFilterTitle()}</h1>
        <p className="text-slate-600">{tasks.length} task{tasks.length !== 1 ? 's' : ''} found</p>
      </div>

      {tasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No tasks found</h3>
            <p className="text-slate-600">
              {filter === 'all' 
                ? "You don't have any tasks yet. Create your first task to get started!"
                : `No ${filter} tasks found. Try adjusting your filter or create a new task.`
              }
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <TaskItem
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default TaskList;