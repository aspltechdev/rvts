/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3002',
                pathname: '/uploads/**'
            },
            {
                protocol: 'https',
                hostname: 'api.researchvisions.com',
                pathname: '/uploads/**'
            },
            {
                protocol: 'http',
                hostname: 'api.researchvisions.com',
                pathname: '/uploads/**'
            },
            {
                protocol: 'http',
                hostname: '**', // Allow any IP or hostname for preview images
                pathname: '/uploads/**'
            },
            {
                protocol: 'https',
                hostname: '**',
                pathname: '/uploads/**'
            },
        ],
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'researchvisions.com',
                port: '',
                pathname: '/uploads/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3002',
                pathname: '/uploads/**',
            }
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
