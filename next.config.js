// next.config.js
const nextConfig = {
  reactStrictMode: true,

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {// https://github.com/donalffons/opencascade.js/blob/dbe35f836d79958b5805b9933f02cc1b74e6053a/starter-templates/ocjs-create-next-app-12/next.config.js#L10
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[name].[hash][ext]',
      },
    })

    // https://ocjs.org/docs/app-dev-workflow/pre-built
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'javascript/auto',
      loader: 'file-loader',
      options: {
        name: 'static/chunks/[name].[hash].[ext]',
      },
    })

     // Add a rule to handle worker files
     config.module.rules.push({
      test: /\.worker\.js$/,
      use: { loader: "worker-loader" },
    });

    // https://stackoverflow.com/a/70995196/8586803
    // https://stackoverflow.com/q/66133602/8586803
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }

    return config
  },
};

module.exports = nextConfig;
