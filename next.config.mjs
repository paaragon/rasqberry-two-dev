/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: process.env.CI === 'true' ? process.env.BASE_PATH
};

export default nextConfig;
