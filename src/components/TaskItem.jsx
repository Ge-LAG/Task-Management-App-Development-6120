import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiEdit2, FiTrash2, FiCheckCircle, FiCircle, FiCalendar, FiFlag } = FiIcons;

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-500 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-500 bg-green-50 border-green-200';
      default: return 'text-slate-500 bg-slate-50 border-slate-200';
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
    <motion.div
      layout
      className={`bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow ${
        task.completed ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <motion.button
          onClick={() => onToggleComplete(task.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-1"
        >
          {task.completed ? (
            <SafeIcon icon={FiCheckCircle} className="text-2xl text-green-500" />
          ) : (
            <SafeIcon icon={FiCircle} className="text-2xl text-slate-400 hover:text-slate-600" />
          )}
        </motion.button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`text-lg font-semibold ${
              task.completed ? 'text-slate-500 line-through' : 'text-slate-800'
            }`}>
              {task.title}
            </h3>
            
            {/* Priority Badge */}
            <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
              <SafeIcon icon={FiFlag} className="text-xs" />
              {task.priority}
            </span>
          </div>

          {task.description && (
            <p className={`text-slate-600 mb-3 ${task.completed ? 'line-through' : ''}`}>
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-slate-500">
              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <SafeIcon icon={FiCalendar} />
                  <span>Due: {formatDate(task.dueDate)}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <span>Created: {formatDate(task.createdAt)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => onEdit(task)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit task"
              >
                <SafeIcon icon={FiEdit2} />
              </motion.button>
              
              <motion.button
                onClick={() => onDelete(task.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete task"
              >
                <SafeIcon icon={FiTrash2} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;