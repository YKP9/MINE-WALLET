// import axios from 'axios'

// export const axiosInstance = axios.create({
//   headers : {
//       "authorization" : `Bearer ${localStorage.getItem('token')}`
//   },
//   baseURL: import.meta.env.VITE_API_URL, 
//   withCredentials: true, 
// })

// // Interceptor to set the Authorization header for each request
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// import axios from 'axios';

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL, // Base URL from environment variables
//   withCredentials: true, // Allows sending cookies across domains
// });

import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Base URL from environment variables
  withCredentials: true, // Allows sending cookies across domains
});

// Interceptor to set the Authorization header for each request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Update header with the latest token
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Optional: Response interceptor for error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);


