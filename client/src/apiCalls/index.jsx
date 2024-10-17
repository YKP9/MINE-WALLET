import axios from 'axios'

export const axiosInstance = axios.create({
  headers : {
      "authorization" : `Bearer ${localStorage.getItem('token')}`
  },
  baseURL: import.meta.env.VITE_API_URL, 
  withCredentials: true, 
})




