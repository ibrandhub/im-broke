import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Add a request interceptor to include the access token in headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Adjust this according to where you store your token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
