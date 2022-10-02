import axios from 'axios';
import { AuthResponse } from '../model/IAuthResponse';

export const instance = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
})

instance.interceptors.request.use((config) => {
  //@ts-ignore
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
  return config
})

// instance.interceptors.response.use((config) => {
//   return config
// }, async (error) => {
//   const originalRequest = error.config
//   if (error.response.status === 401 && error.config && !error.config._isRetry) {
//     originalRequest._isRetry = true
//     try {
//       const response = await axios.get<AuthResponse>('http://localhost:5000/api/me')
//       localStorage.setItem('token', response.data.accessToken)
//       return instance.request(originalRequest)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   throw error
// })