import axios from 'axios';

const base = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE_URL || '');

export const api = axios.create({
  baseURL: base,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
