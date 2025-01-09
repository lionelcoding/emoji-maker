/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        REPLICATE_API_TOKEN: process.env.REPLICATE_API_TOKEN || '',
    },
    experimental: {
        // Remove serverActions as it's now default in Next.js 14
    },
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        };
        return config;
    },
};

console.log('Next.js Config ENV:', {
    hasToken: !!process.env.REPLICATE_API_TOKEN,
});

export default nextConfig;
