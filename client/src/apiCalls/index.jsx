// import axios from 'axios'



// import axios from 'axios';

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL, // Base URL from environment variables
//   withCredentials: true, // Allows sending cookies across domains
// });

// export const axiosInstance = axios.create({
//   headers : {
//       "authorization" : `Bearer ${localStorage.getItem('token')}`
//   }
// })

// Interceptor to set the Authorization header for each request
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
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem('token')}`, // Set the Authorization header with the token
//   },
// });

// import axios from 'axios';

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL, // Base URL from environment variables
//   withCredentials: true, // Allows sending cookies across domains
// });

// Interceptor to set Authorization header dynamically
// 

import axios from 'axios';

// Function to get a specific cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Base URL from environment variables
  withCredentials: true, // Allows sending cookies across domains
});

// Interceptor to set Authorization header dynamically
axiosInstance.interceptors.request.use((config) => {
  const token = getCookie('accessToken'); // Assuming 'accessToken' is the cookie name for the access token
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization; // Remove the header if no token is available
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});



