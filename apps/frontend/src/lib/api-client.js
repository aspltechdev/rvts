export async function getProductBySlug(slug) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'
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
