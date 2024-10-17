import axios from 'axios'

export const axiosInstance = axios.create({
  headers : {
      "authorization" : `Bearer ${localStorage.getItem('token')}`
  }
})

// Interceptor to set the Authorization header for each request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// import axios from 'axios';

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL, // Base URL from environment variables
//   withCredentials: true, // Allows sending cookies across domains
// });

