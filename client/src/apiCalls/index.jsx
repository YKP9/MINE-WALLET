// import axios from 'axios'
// import { useCookies } from 'react-cookie'

// const { cookies } = useCookies()

// export const axiosInstance = axios.create({
//     baseURL : 'https://mine-wallet-backend.onrender.com',
//     withCredentials : true,
//     headers : {
//        "Authorization" : `Bearer ${cookies.accessToken}`,
//     }
   
   
// })

import axios from 'axios';
import { useCookies } from 'react-cookie';

// Create an Axios instance
export const axiosInstance = axios.create({
    baseURL: 'https://mine-wallet-backend.onrender.com',
    withCredentials: true,
});

// Interceptor to attach the token to every request
axiosInstance.interceptors.request.use((config) => {
    const [cookies] = useCookies(['accessToken']);
    if (cookies.accessToken) {
        config.headers['Authorization'] = `Bearer ${cookies.accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

;
