import React, { useState } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList = ({ todos, onToggle, onEdit, onDelete, onUpdate }) => {
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, completed

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleUpdate = async (formData) => {
    if (editingTodo) {
      await onUpdate(editingTodo.id, formData);
      setEditingTodo(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.isCompleted;
      case 'completed':
        return todo.isCompleted;
      default:
        return true;
    }
  });

  const todoStats = {
    total: todos.length,
    active: todos.filter(todo => !todo.isCompleted).length,
    completed: todos.filter(todo => todo.isCompleted).length
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No todos yet</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating your first todo above.</p>
      </div>
    );
  }

  return (
    <div>
      {editingTodo && (
        <div className="mb-6">
          <TodoForm
            initialData={editingTodo}
            onSubmit={handleUpdate}
            onCancel={handleCancelEdit}
          />
        </div>
      )}

      {/* Stats and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{todoStats.total}</span> total,{' '}
              <span className="font-medium text-blue-600">{todoStats.active}</span> active,{' '}
              <span className="font-medium text-green-600">{todoStats.completed}</span> completed
            </div>
          </div>

          <div className="flex space-x-1">
            {['all', 'active', 'completed'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-3 py-1 text-sm rounded-md capitalize transition-colors ${
                  filter === filterType
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filterType}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Todo Items */}
      <div className="space-y-4">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No {filter === 'all' ? '' : filter} todos found.
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onEdit={handleEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>

      {/* Quick Actions */}
      {todoStats.completed > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              const completedTodos = todos.filter(todo => todo.isCompleted);
              if (window.confirm(`Delete all ${completedTodos.length} completed todos?`)) {
                completedTodos.forEach(todo => onDelete(todo.id));
              }
            }}
            className="text-sm text-red-600 hover:text-red-800 underline"
          >
            Clear all completed todos
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
