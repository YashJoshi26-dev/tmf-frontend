import axios from 'axios';
import { storage } from '@/utils/storage';

const baseURL = import.meta.env.VITE_API_URL || '/api/v1';

const client = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 20000,
});

// ---------- Request: attach access token ----------
client.interceptors.request.use((config) => {
  const token = storage.get('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---------- Response: auto-refresh on 401 ----------
let refreshing = null;

client.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    const original = error.config;

    if (!error.response) return Promise.reject({ message: 'Network error', original: error });

    const { status, data } = error.response;

    if (status === 401 && !original._retry && !original.url?.includes('/auth/')) {
      original._retry = true;
      try {
        // Use raw axios to avoid interceptor loop
        refreshing = refreshing || axios.post(
          `${baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const result = await refreshing;
        refreshing = null;

        const newToken = result.data?.data?.accessToken;
        if (newToken) {
          storage.set('accessToken', newToken);
          original.headers.Authorization = `Bearer ${newToken}`;
          return client(original);
        }
      } catch {
        refreshing = null;
        storage.remove('accessToken');
        window.dispatchEvent(new CustomEvent('auth:expired'));
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject({
      message: data?.message || 'Something went wrong',
      details: data?.details,
      status,
    });
  }
);

export default client;