/** @type {import('next').NextConfig} */
// next.config.mjs
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.BACKEND_URL || 'http://localhost:8080/api/:path*',
            },
        ];
    },
};

export default nextConfig;
