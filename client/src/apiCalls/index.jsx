import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL : 'https://mine-wallet-backend.onrender.com',
    headers : {
        "authorization" : `Bearer ${localStorage.getItem('token')}`
    }
})