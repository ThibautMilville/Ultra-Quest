import axios from 'axios';

const apiUrl: string = import.meta.env.VITE_APP_API_URL || '/api'

export const apiRequestor = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Log pour debug en développement
if (import.meta.env.DEV) {
  console.log('API URL:', apiUrl);
}