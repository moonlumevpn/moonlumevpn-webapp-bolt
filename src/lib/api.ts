import axios from 'axios';
import { getAccessToken, ensureValidAccessToken, refreshTokens } from './auth';

const base = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE_URL || '');

export const api = axios.create({
  baseURL: base,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to ensure the token is valid and include it
api.interceptors.request.use(
  async (config) => {
    // refresh if needed before every request
    await ensureValidAccessToken();
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor handles 401 by attempting a refresh once
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const ok = await refreshTokens();
      if (ok) {
        originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
