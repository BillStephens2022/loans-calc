/** @type {import('next').NextConfig} */
import path, { __dirname } from "path";

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, './'); // Assuming your root is where the 'pages' directory resides
    return config;
  },
}

export default nextConfig;



