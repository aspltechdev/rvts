import axios from 'axios';

const baseURL = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002').replace(/^"|"$/g, '');

const api = axios.create({
    baseURL,
});

export default api;
