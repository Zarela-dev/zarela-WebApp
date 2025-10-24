const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Add polyfills for Node.js core modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "buffer": require.resolve("buffer"),
        "process": require.resolve("process/browser"),
        "crypto": require.resolve("crypto-browserify"),
        "util": require.resolve("util"),
        "vm": require.resolve("vm-browserify"),
        "os": require.resolve("os-browserify/browser"),
      };

      // Disable ESLint warnings
      webpackConfig.plugins = webpackConfig.plugins.filter(
        plugin => plugin.constructor.name !== 'ESLintWebpackPlugin'
      );

      // Disable source map warnings
      webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {
        if (rule.oneOf) {
          rule.oneOf = rule.oneOf.map(oneOfRule => {
            if (oneOfRule.loader && oneOfRule.loader.includes('source-map-loader')) {
              oneOfRule.enforce = 'pre';
              oneOfRule.exclude = /node_modules/;
            }
            return oneOfRule;
          });
        }
        return rule;
      });

      return webpackConfig;
    },
  },
};
