import axios from 'axios'
import { useCookies } from 'react-cookie'

const { cookies } = useCookies()

export const axiosInstance = axios.create({
    baseURL : 'https://mine-wallet-backend.onrender.com',
    withCredentials : true,
    headers : {
       "Authorization" : `Bearer ${cookies.accessToken}`,
    }
   
   
})