import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api',
    headers: {
    'x-api-key': 'reqres-free-v1'
  }
});

export const registerUser = (email, password) => api.post('/register', { email, password });
export const loginUser = (email, password) => { return api.post('/login', { email, password });};

export default api;
