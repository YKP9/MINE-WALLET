import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL : 'https://mine-wallet-backend.onrender.com',
    withCredentials : true,
    headers : {
        "authorization" : `Bearer ${localStorage.getItem('token')}`
    }
})