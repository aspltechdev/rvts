
const isProd = process.env.NODE_ENV === 'production';

// Prioritize hardcoded production URL if in production mode
export const API_BASE_URL = isProd
    ? 'http://api.researchvisions.com'
    : (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002');
