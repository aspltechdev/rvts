import { API_BASE_URL } from './config';

export async function getProductBySlug(slug) {
    try {
        const apiUrl = API_BASE_URL;
        const res = await fetch(`${apiUrl}/api/products/${slug}`, {
            cache: 'no-store', // or ISR
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}
