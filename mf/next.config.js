const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'mf',
        filename: 'static/chunks/remoteEntryMF.js',
        exposes: {
          './MyComp': './src/components/MyComp.tsx',
        },
        shared: {
          // specify shared dependencies
          // read more in Shared Dependencies section
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
