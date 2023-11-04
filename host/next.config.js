const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const {
  createDelegatedModule,
} = require('@module-federation/nextjs-mf/utilities');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          // mf: `mf@http://localhost:8002/_next/static/${
          //   isServer ? 'ssr' : 'chunks'
          // }/remoteEntryMF.js`,

          mf: createDelegatedModule(
            require.resolve('./src/remote-delegate.js'),
            {
              remote: `mf@http://localhost:8002/_next/static/${
                isServer ? 'ssr' : 'chunks'
              }/remoteEntryMF.js`,
            }
          ),
          // mf: `internal ./src/remote-delegate.js?remote=mf@http://localhost:8002/_next/static/${
          //   isServer ? 'ssr' : 'chunks'
          // }/remoteEntryMF.js`,
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
