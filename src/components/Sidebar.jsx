import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiList, FiPlus, FiSearch, FiCheckCircle, FiClock, FiAlertCircle } = FiIcons;

const Sidebar = ({ filter, setFilter, onAddTask, searchQuery, setSearchQuery, tasksCount }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/tasks', icon: FiList, label: 'All Tasks' }
  ];

  const filterItems = [
    { key: 'all', label: 'All Tasks', count: tasksCount.total, icon: FiList },
    { key: 'pending', label: 'Pending', count: tasksCount.pending, icon: FiClock },
    { key: 'completed', label: 'Completed', count: tasksCount.completed, icon: FiCheckCircle },
    { key: 'high', label: 'High Priority', icon: FiAlertCircle },
    { key: 'medium', label: 'Medium Priority', icon: FiAlertCircle },
    { key: 'low', label: 'Low Priority', icon: FiAlertCircle }
  ];

  return (
    <div className="w-80 bg-white shadow-xl border-r border-slate-200 h-screen overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-8">TaskFlow</h1>
        
        {/* Search */}
        <div className="relative mb-6">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Add Task Button */}
        <motion.button
          onClick={onAddTask}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium mb-8 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          <SafeIcon icon={FiPlus} className="text-lg" />
          Add New Task
        </motion.button>

        {/* Navigation */}
        <nav className="mb-8">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Navigation</h2>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="text-lg" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Filters */}
        {location.pathname === '/tasks' && (
          <div>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Filters</h2>
            <ul className="space-y-2">
              {filterItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => setFilter(item.key)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      filter === item.key
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <SafeIcon 
                        icon={item.icon} 
                        className={`text-lg ${
                          item.key === 'high' ? 'text-red-500' :
                          item.key === 'medium' ? 'text-yellow-500' :
                          item.key === 'low' ? 'text-green-500' : ''
                        }`} 
                      />
                      {item.label}
                    </div>
                    {item.count !== undefined && (
                      <span className="bg-slate-200 text-slate-600 px-2 py-1 rounded-full text-xs font-medium">
                        {item.count}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;