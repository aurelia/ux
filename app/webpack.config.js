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
          {
            '@aurelia-ux/button': path.resolve(__dirname, '../packages/button/src'),
            '@aurelia-ux/core': path.resolve(__dirname, '../packages/core/src')
          })
        )
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
        noModulePathResolve: true
      }),
      new HtmlWebpackPlugin({

        template: './index.ejs'
      })
    ]
  }
}
