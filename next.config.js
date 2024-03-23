import path from 'path'; // Import path module

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname); // Import path and use it here
    return config;
  },
};

export default nextConfig;



