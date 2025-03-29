import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    transpilePackages: ['next-mdx-remote'],
    env: {
        GA_ID: process.env.GA_ID,
        NAVER_SITE_VERIFICATION: process.env.NAVER_SITE_VERIFICATION,
    },
};

export default nextConfig;
