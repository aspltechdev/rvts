import axios from 'axios';

const getBaseURL = () => {
    if (typeof window !== 'undefined') {
        // We are on the client side
        return window.location.origin;
    }
    return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002';
};

const api = axios.create({
    baseURL: getBaseURL().replace(/^"|"$/g, ''),
});

export default api;
