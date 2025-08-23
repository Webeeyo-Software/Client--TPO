// utils/authApi.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from './api'; // your base API URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken'); // get token from storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // attach token to headers
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
