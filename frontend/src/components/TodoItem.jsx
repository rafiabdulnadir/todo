import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await onToggle(todo.id);
    } catch (error) {
      console.error('Error toggling todo:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setIsDeleting(true);
      try {
        await onDelete(todo.id);
      } catch (error) {
        console.error('Error deleting todo:', error);
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
      todo.isCompleted ? 'border-green-500 bg-green-50' : 'border-blue-500'
    } ${isDeleting ? 'opacity-50' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={handleToggle}
            disabled={isToggling || isDeleting}
            className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              todo.isCompleted
                ? 'bg-green-500 border-green-500 text-white focus:ring-green-500'
                : 'border-gray-300 hover:border-blue-500 focus:ring-blue-500'
            } ${isToggling ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {isToggling ? (
              <div className="w-3 h-3 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            ) : todo.isCompleted ? (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : null}
          </button>

          <div className="flex-1">
            <h3 className={`text-lg font-medium ${
              todo.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {todo.title}
            </h3>
            
            {todo.description && (
              <p className={`mt-1 text-sm ${
                todo.isCompleted ? 'line-through text-gray-400' : 'text-gray-600'
              }`}>
                {todo.description}
              </p>
            )}
            
            <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
              <span>Created: {formatDate(todo.createdAt)}</span>
              {todo.updatedAt && (
                <span>Updated: {formatDate(todo.updatedAt)}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onEdit(todo)}
            disabled={isDeleting}
            className="p-2 text-gray-400 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            title="Edit todo"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete todo"
          >
            {isDeleting ? (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
