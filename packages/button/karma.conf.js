const path = require('path');
const { configureKarma } = require('../../karma.conf');

module.exports = (config) => {
  configureKarma(config, (options) => {
    options.basePath = path.resolve(__dirname);
  });
};
