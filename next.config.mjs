/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'liveblocks.io',
          port: '',
        },
      ],
    },
    webpack: (config, { isServer }) => {
      // Add custom rule for .node files
      config.module.rules.push({
        test: /\.node$/,
        use: 'node-loader',
      });
  
      // Add this to ensure it works for both server and client
      if (isServer) {
        config.externals = config.externals || [];
        config.externals.push(({ context, request }, callback) => {
          if (/\.node$/.test(request)) {
            callback(null, 'commonjs ' + request);
          } else {
            callback();
          }
        });
      }
  
      return config;
    },
  };
  
  export default nextConfig;
  