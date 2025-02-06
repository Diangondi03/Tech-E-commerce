import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.in/api/', 
});

export const dbAxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/', 
});

dbAxiosInstance.interceptors.request.use(
  (config) => {
    const token : string | null = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);