import axios from 'axios';

const DEFAULT_API_BASE_URL = 'https://web.moonlumevpn.ru/api';

const base = import.meta.env.DEV ? '/api' : (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL);

export const api = axios.create({
  baseURL: base,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
