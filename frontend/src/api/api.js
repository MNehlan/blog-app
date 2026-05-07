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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/signup') {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;