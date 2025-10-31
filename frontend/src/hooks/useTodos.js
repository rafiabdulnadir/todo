import { useState, useEffect, useCallback } from 'react';
import { todoService } from '../services/todoService';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all todos
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new todo
  const createTodo = useCallback(async (todoData) => {
    setError(null);
    try {
      const newTodo = await todoService.createTodo(todoData);
      setTodos(prevTodos => [newTodo, ...prevTodos]);
      return newTodo;
    } catch (err) {
      setError(err.message);
      console.error('Error creating todo:', err);
      throw err;
    }
  }, []);

  // Update a todo
  const updateTodo = useCallback(async (id, todoData) => {
    setError(null);
    try {
      const updatedTodo = await todoService.updateTodo(id, todoData);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? updatedTodo : todo
        )
      );
      return updatedTodo;
    } catch (err) {
      setError(err.message);
      console.error('Error updating todo:', err);
      throw err;
    }
  }, []);

  // Delete a todo
  const deleteTodo = useCallback(async (id) => {
    setError(null);
    try {
      await todoService.deleteTodo(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting todo:', err);
      throw err;
    }
  }, []);

  // Toggle todo completion
  const toggleTodo = useCallback(async (id) => {
    setError(null);
    try {
      const updatedTodo = await todoService.toggleTodo(id);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? updatedTodo : todo
        )
      );
      return updatedTodo;
    } catch (err) {
      setError(err.message);
      console.error('Error toggling todo:', err);
      throw err;
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load todos on mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearError
  };
};
