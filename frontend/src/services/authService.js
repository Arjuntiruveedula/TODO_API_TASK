import axios from 'axios';

const API_URL = 'https://todo-api-task-2.onrender.com/api/auth';

const register = async (userData) => {
  
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

const getProfile = async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${API_URL}/profile`, config);
  return response.data;
};

const authService = {
  register,
  login,
  getProfile
};

export default authService;
