import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, 
  // baseURL: "http://localhost:5200", 
  withCredentials: true,           
  headers: {
    'Content-Type': 'application/json'
  },
});

export default axiosInstance; 