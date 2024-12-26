/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.BUILD_TYPE === 'standalone' ? 'standalone' : undefined,
};

export default nextConfig;
