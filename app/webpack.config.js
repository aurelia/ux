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
      extensions: ['.ts', '.js'],
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules'),
        // root node modules for common aurelia packages
        path.resolve(__dirname, '../node_modules')
      ],
      alias: {
        'src': path.resolve(__dirname, 'src'),
        // alias all aurelia packages to parent node_modules,
        // so packages & core modules will use the same version of core modules
        ...([
          'loader',
          'pal',
          'pal-browser',
          'metadata',
          'logging'
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
        // alias all packages to src code
        // ...([
        //   'button',
        //   'card',
        //   'checkbox',
        //   'chip-input',
        //   'core',
        //   'datepicker',
        //   'form',
        //   'grid',
        //   'icons',
        //   'input',
        //   'input-info',
        //   'list',
        //   'radio',
        //   'select',
        //   'slider',
        //   'switch',
        //   'textarea',
        // ].reduce((map, packageName) => {
        //   const mappedPackagedName = `@aurelia-ux/${packageName}`;
        //   map[mappedPackagedName] = path.resolve(__dirname, `../packages/${packageName}/src`)
        //   return map;
        // }, {}))
      }
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
          test: /\.css$/,
          loader: 'css-loader'
        }
      ]
    },
    plugins: [
      new AureliaWebpackPlugin.AureliaPlugin({
        config: [
          "defaultBindingLanguage",
          // "router",
          // "history",
          "defaultResources",
          "eventAggregator",
          "developmentLogging",
        ],
        aureliaApp: undefined,
        entry: undefined,
        dist: 'es2015',
      }),
      new HtmlWebpackPlugin({

        template: './index.ejs'
      })
    ]
  }
}
