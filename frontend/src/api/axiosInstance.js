import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, //  This sends and receives cookie
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance; 