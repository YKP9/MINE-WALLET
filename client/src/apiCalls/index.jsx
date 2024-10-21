import axios from 'axios'
 
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  withCredentials: true,
});

// You can create an interceptor to add the token dynamically
axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("token"); // Replace with the logic to get token from cookies
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


// export const axiosInstance = axios.create({

//     headers : {
//         "authorization" : `Bearer ${localStorage.getItem('token')}`
//     },
//     baseURL: import.meta.env.VITE_API_URL, 
//     withCredentials: true, 
//   })
  


