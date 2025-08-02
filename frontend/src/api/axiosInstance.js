import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.60.229:5200', 
  withCredentials: true,           
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance; 