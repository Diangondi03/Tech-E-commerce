import axios from 'axios';


export const axiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.in/api/', 
});

export const dbAxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/', 
});