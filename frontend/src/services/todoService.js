import api from './authService';

export const todoService = {
  // Get all todos
  async getAllTodos() {
    try {
      const response = await api.get('/todo');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch todos: ${error.message}`);
    }
  },

  // Get todo by ID
  async getTodoById(id) {
    try {
      const response = await api.get(`/todo/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch todo: ${error.message}`);
    }
  },

  // Create new todo
  async createTodo(todoData) {
    try {
      const response = await api.post('/todo', todoData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error('Invalid todo data. Please check your input.');
      }
      throw new Error(`Failed to create todo: ${error.message}`);
    }
  },

  // Update todo
  async updateTodo(id, todoData) {
    try {
      const response = await api.put(`/todo/${id}`, todoData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Todo not found.');
      }
      if (error.response?.status === 400) {
        throw new Error('Invalid todo data. Please check your input.');
      }
      throw new Error(`Failed to update todo: ${error.message}`);
    }
  },

  // Delete todo
  async deleteTodo(id) {
    try {
      await api.delete(`/todo/${id}`);
      return true;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Todo not found.');
      }
      throw new Error(`Failed to delete todo: ${error.message}`);
    }
  },

  // Toggle todo completion status
  async toggleTodo(id) {
    try {
      const response = await api.patch(`/todo/${id}/toggle`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Todo not found.');
      }
      throw new Error(`Failed to toggle todo: ${error.message}`);
    }
  }
};

export default todoService;
