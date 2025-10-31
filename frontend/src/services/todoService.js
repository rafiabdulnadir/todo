import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Allow self-signed certificates in development
  httpsAgent: process.env.NODE_ENV === 'development' ? {
    rejectUnauthorized: false
  } : undefined
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response) {
      // Server responded with error status
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

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
