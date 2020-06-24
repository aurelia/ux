const path = require('path');
const { configureKarma } = require('../../karma.conf');
const AureliaWebpackPlugin = require('aurelia-webpack-plugin');

module.exports = (config) => {
  configureKarma(config, (options) => {
    Object.assign(
      options.webpack.resolve.alias,
      ([
        'polyfills',
        'dependency-injection',
        'loader',
        'pal',
        'pal-browser',
        'metadata',
        'logging',
        'binding',
        'path',
        'framework',
        'history',
        'history-browser',
        'event-aggregator',
        'router',
        'route-recognizer',
        'templating',
        'templating-binding',
        'templating-resources',
        'templating-router',
        'task-queue',
      ].reduce(
        /**
         * @param {Record<string, string>} map
         */
        (map, packageName) => {
          const aureliaName = `aurelia-${packageName}`;
          map[aureliaName] = path.resolve(__dirname, `../../node_modules/${aureliaName}`);
          return map;
        },
        {}
      )),
      // alias all packages to src code
      ([
        'button',
        'card',
        'checkbox',
        'chip-input',
        'core',
        'datepicker',
        'expandable',
        'form',
        'grid',
        'icons',
        'input',
        'input-info',
        'list',
        'lookup',
        'modal',
        'popup',
        'positioning',
        'progress',
        'radio',
        'select',
        'sidenav',
        'slider',
        'switch',
        'textarea',
        'tree-view'
      ].reduce((map, packageName) => {
        const mappedPackagedName = `@aurelia-ux/${packageName}`;
        map[mappedPackagedName] = path.resolve(__dirname, `../${packageName}/src/`);
        return map;
      }, {}))
    ),
    options.webpack.module.rules.push({
      test: /\.html$/,
      loader: 'html-loader'
    });
    options.webpack.plugins.push(new AureliaWebpackPlugin.AureliaPlugin({
      dist: 'es2015'
    }));
    options.webpack.entry = 'test/setup.ts';
    options.basePath = path.resolve(__dirname);
  });
};
