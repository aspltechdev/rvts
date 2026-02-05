/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/product/:slug*',
                destination: '/products/:slug*',
                permanent: true,
            },
        ];
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
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
                protocol: 'http',
                hostname: 'researchvisions.com',
                pathname: '/uploads/**'
            }
        ],
    },
};

export default nextConfig;
