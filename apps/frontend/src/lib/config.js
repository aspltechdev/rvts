
const getBaseURL = () => {
    // 1. Priority: The environment variable
    const envURL = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/^"|"$/g, '');
    if (envURL && !envURL.includes('localhost')) return envURL;

    // 2. Fallback: On the web, use the current domain (helps with deployment)
    if (typeof window !== 'undefined') return '';

    // 3. Last result: Localhost for local development
    return 'http://localhost:3002';
};

export const API_BASE_URL = getBaseURL();
