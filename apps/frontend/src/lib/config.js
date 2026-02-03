
const isProd = process.env.NODE_ENV === 'production';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || (isProd ? 'http://api.researchvisions.com' : 'http://localhost:3002');
