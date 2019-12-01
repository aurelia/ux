// @ts-check
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**@type {any} */
const AureliaWebpackPlugin = require('aurelia-webpack-plugin');

/**
 * @returns {import('webpack').Configuration}
 */
module.exports = function({ production = '' } = {}) {
  return {
    mode: production === 'production' ? 'production' : 'development',
    resolve: {
      // symlinks: true,
      extensions: ['.ts', '.js'],
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules'),
        // root node modules for common aurelia packages
        // path.resolve(__dirname, '../packages/core'),
        // path.resolve(__dirname, '../packages/datepicker')
      ],
      alias: {
        'src': path.resolve(__dirname, 'src'),
        // '@aurelia-ux': path.resolve(__dirname, '../packages'),
        // alias all aurelia packages to parent node_modules,
        // so packages & core modules will use the same version of core modules
        ...([
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
            map[aureliaName] = path.resolve(__dirname, `../node_modules/${aureliaName}`);
            return map;
          },
          {}
        )),
        // moment: path.resolve(__dirname, './node_modules/moment'),
        // alias all packages to src code
        ...([
          'button',
          'card',
          'checkbox',
          'chip-input',
          'core',
          'datepicker',
          'form',
          'grid',
          'icons',
          'input',
          'input-info',
          'list',
          'radio',
          'select',
          'slider',
          'switch',
          'textarea',
        ].reduce((map, packageName) => {
          const mappedPackagedName = `@aurelia-ux/${packageName}`;
          map[mappedPackagedName] = path.resolve(__dirname, `../packages/${packageName}/src/`);
          return map;
        }, {}))
      },

    },
    entry: {
      app: './src/main.ts'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader'
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.css$/i,
          issuer: [{ not: [{ test: /\.html$/i }] }],
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.css$/i,
          issuer: [{ test: /\.html$/i }],
          // CSS required in templates cannot be extracted safely
          // because Aurelia would try to require it again in runtime
          use: ['css-loader']
        },
      ]
    },
    plugins: [
      new AureliaWebpackPlugin.AureliaPlugin({
        // config: [
        //   "defaultBindingLanguage",
        //   // "router",
        //   // "history",
        //   "defaultResources",
        //   "eventAggregator",
        //   "developmentLogging",
        // ],
        aureliaApp: undefined,
        entry: undefined,
        dist: 'es2015',
        // noModulePathResolve: true,
      }),
      new AureliaWebpackPlugin.ModuleDependenciesPlugin({
        "@aurelia-ux/datepicker": [
          "./ux-calendar.html",
          "./ux-datepicker.html",
          "./ux-picker-dialog.html",
          "./ux-year-list.html",
        ],
      }),
      new HtmlWebpackPlugin({

        template: './index.ejs'
      })
    ]
  }
}
