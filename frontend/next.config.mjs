/** @type {import('next').NextConfig} */
// next.config.mjs
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                // destination: 'http://localhost:8080/api/:path*',
                destination: 'http://172.20.20.196:8080/api/:path*',
            },
        ];
    },
};

export default nextConfig;
