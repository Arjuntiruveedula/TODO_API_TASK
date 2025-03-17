import axios from 'axios';

const API_URL = 'https://todo-api-task-crk3.vercel.app/api/todos';

// Add token to every request
const authHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const getTodos = async () => {
  const response = await axios.get(API_URL, authHeader());
  return response.data;
};

const createTodo = async (todoData) => {
  const response = await axios.post(API_URL, todoData, authHeader());
  return response.data;
};

const getTodoById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, authHeader());
  return response.data;
};

const updateTodo = async (id, todoData) => {
  const response = await axios.put(`${API_URL}/${id}`, todoData, authHeader());
  return response.data;
};

const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, authHeader());
  return response.data;
};

const todoService = {
  getTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo
};

export default todoService;
