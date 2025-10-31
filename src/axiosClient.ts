// axiosClient.ts
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // 👈 change to your base API URL
  withCredentials: true, // if you're using cookies / auth
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer your_token' 👈 if needed
  },
});

export default axiosClient;
