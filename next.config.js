import path from 'path'; // Import path module

const __dirname = path.resolve(); // Get the root directory of the project

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['@'] = __dirname; // Set alias to root directory
    return config;
  },
};

export default nextConfig;