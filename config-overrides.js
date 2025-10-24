const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add polyfills for Node.js core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert"),
    "buffer": require.resolve("buffer"),
    "process": require.resolve("process/browser"),
    "crypto": require.resolve("crypto-browserify"),
    "util": require.resolve("util"),
    "vm": require.resolve("vm-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "path": require.resolve("path-browserify"),
    "fs": false,
    "net": false,
    "tls": false,
    "child_process": false,
  };

  // Add Buffer and process polyfill plugins
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    })
  );

  // Ensure Buffer is available globally
  config.plugins.push(
    new webpack.DefinePlugin({
      global: 'globalThis',
    })
  );

  // Fix for process/browser resolution issues
  config.resolve.alias = {
    ...config.resolve.alias,
    'process/browser': require.resolve('process/browser'),
  };

  // Ignore source map warnings
  config.ignoreWarnings = [
    /Failed to parse source map/,
    /Module Warning/,
  ];

  return config;
};
