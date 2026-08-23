import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      let token = localStorage.getItem('stakelab_admin_token');
      if (!token && document.cookie) {
        const match = document.cookie.split('; ').find(row => row.startsWith('stakelab_admin_token=') || row.startsWith('sec-admin-token='));
        if (match) {
          token = match.split('=')[1];
        }
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Admin operation failed';
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('stakelab_admin_token');
    }
    return Promise.reject(error);
  }
);

export default api;
