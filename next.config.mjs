/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, options) {
        // Ensure no HTML files are handled incorrectly
        config.module.rules.push({
          test: /\.html$/,
          use: 'ignore-loader',
        });
        
        return config;
      },
};

export default nextConfig;
