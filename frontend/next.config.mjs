/** @type {import('next').NextConfig} */
// next.config.mjs
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://68.183.158.185/:8080/api/:path*',
            },
        ];
    },
};

export default nextConfig;
