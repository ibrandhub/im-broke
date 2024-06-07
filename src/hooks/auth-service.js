import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL;

export const AuthService = () => {
  const login = async (username, password) => {
    try {
      const response = await axios.post(API_URL + 'user/login', {
        email: username,
        password,
        expiresIn: 60000
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error) {
      console.error('Error during login', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(API_URL + 'user/register', {
        name,
        email,
        password
      });

      return response.data;
    } catch (error) {
      console.error('Error during registration', error);
      throw error;
    }
  };

  const getCurrentUser = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return null;
      }

      // Decode the token if needed or validate its structure
      // This can be done using a library like jwt-decode
      // const user = jwtDecode(token);

      return token;
    } catch (error) {
      console.error('Error retrieving current user', error);
      return null;
    }
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(API_URL + 'getuser', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        return response.data;
      } else {
        localStorage.removeItem('token');
        return null;
      }
    } catch (error) {
      localStorage.removeItem('token');
      // localStorage.removeItem('token');
      console.error('Error fetching user data', error);
      throw error;
    }
  };

  // Add a method to set up the authorization header for requests
  const setupAxiosInterceptors = () => {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };

  // Call setupAxiosInterceptors when the AuthService is initialized
  setupAxiosInterceptors();

  return {
    login,
    logout,
    register,
    getCurrentUser,
    isAuthenticated,
    getUserData
  };
};
