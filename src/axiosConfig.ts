import axios from 'axios';


export const axiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.in/api/', // Replace with your API base URL
});