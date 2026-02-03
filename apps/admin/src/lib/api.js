import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';
const baseURL = isProd ? 'http://api.researchvisions.com' : (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002');

const api = axios.create({
    baseURL,
});

export default api;
