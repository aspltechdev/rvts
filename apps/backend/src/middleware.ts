import { NextResponse } from 'next/server';

export function middleware(request: any) {
    // Extract origin from headers
    const origin = request.headers.get('origin') || '';

    // Define allowed origins
    const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://researchvisions.com',
        'http://admin.researchvisions.com',
        'https://researchvisions.com',
        'https://admin.researchvisions.com',
    ];

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400',
            },
        });
    }

    // Handle actual requests
    const response = NextResponse.next();

    // Set CORS headers
    if (allowedOrigins.includes(origin) || allowedOrigins.some(ao => origin.endsWith(ao))) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    } else {
        // For production safety, you can be more strict here, 
        // but for troubleshooting, we use '*' or the origin
        response.headers.set('Access-Control-Allow-Origin', '*');
    }

    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
}

// Only run middleware on API routes
export const config = {
    matcher: '/api/:path*',
};
