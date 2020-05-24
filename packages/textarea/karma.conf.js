const path = require('path');
const { configureKarma, configureAliasCore } = require('../../karma.conf');

module.exports = (config) => {
  configureKarma(config, (options) => {
    configureAliasCore(options);
    options.basePath = path.resolve(__dirname);
  });
};
