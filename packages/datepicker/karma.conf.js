const path = require('path');
const { configureKarma } = require('../../karma.conf');

module.exports = (config) => {
  configureKarma(config, (options) => {
    options.webpack.resolve.alias['@aurelia-ux/core'] = path.resolve(
      __dirname,
      '../core/src'
    );
    options.basePath = path.resolve(__dirname);
  });
};
