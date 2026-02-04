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
        ],
    },
};

export default nextConfig;
