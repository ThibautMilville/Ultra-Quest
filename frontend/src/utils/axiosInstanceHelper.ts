import axios, { AxiosInstance } from 'axios';

const apiUrl: string = import.meta.env.VITE_API_URL || ''

export const apiRequestor: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})