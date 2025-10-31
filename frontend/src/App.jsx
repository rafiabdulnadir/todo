import React from 'react';
import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearError
  } = useTodos();

  const handleCreateTodo = async (formData) => {
    try {
      await createTodo(formData);
    } catch (error) {
      // Error is already handled in the hook
      console.error('Failed to create todo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📝 Todo App
          </h1>
          <p className="text-gray-600">
            A modern full-stack todo application built with React.js and ASP.NET Core
          </p>
        </header>

        {/* Error Message */}
        <ErrorMessage message={error} onClose={clearError} />

        {/* Add Todo Form */}
        <TodoForm onSubmit={handleCreateTodo} />

        {/* Loading State */}
        {loading && <LoadingSpinner message="Loading todos..." />}

        {/* Todo List */}
        {!loading && (
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Built with ❤️ using{' '}
            <a href="https://reactjs.org" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              React.js
            </a>{' '}
            and{' '}
            <a href="https://dotnet.microsoft.com/apps/aspnet" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              ASP.NET Core
            </a>
          </p>
          <p className="mt-1">
            API Status:{' '}
            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
              error ? 'bg-red-500' : 'bg-green-500'
            }`}></span>
            {error ? 'Disconnected' : 'Connected'}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;

