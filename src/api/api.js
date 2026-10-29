import axios from 'axios';

// Development goes through Vite's local /api proxy. Production retains its
// configured server. VITE_DEV_API_URL is an explicit development override.
const configured = import.meta.env.DEV
  ? import.meta.env.VITE_DEV_API_URL
  : import.meta.env.VITE_API_URL;
const baseURL = (configured || '').trim().replace(/\/+$/, '').replace(/\/api$/, '');
const API = axios.create({ baseURL, timeout: 30000 });

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && !config.url?.startsWith('/api/auth/')) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

API.interceptors.response.use(response => response, error => {
  if (error.response?.status === 401 && !error.config?.url?.startsWith('/api/auth/')) {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    if (window.location.pathname !== '/login') window.location.assign('/login?expired=1');
  }
  return Promise.reject(error);
});
export default API;
