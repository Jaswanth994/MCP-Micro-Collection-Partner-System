import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://mcp-backend-hm9r.onrender.com/api', // your backend URL
});
