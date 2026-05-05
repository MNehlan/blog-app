import axios from 'axios';

const api = axios.create({
  baseURL: 'https://blog-app-backend-j969.onrender.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.authorization = token;
  }
  return config;
});

export default api;