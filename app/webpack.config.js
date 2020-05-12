// @ts-check
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**@type {any} */
const AureliaWebpackPlugin = require('aurelia-webpack-plugin');

const outDir = path.resolve(__dirname, 'dist');
/**
 * @returns {import('webpack').Configuration}
 */
module.exports = function ({ production = '' } = {}) {
  return {
    mode: production === 'production' ? 'production' : 'development',
    output: {
      path: outDir,
      filename: production ? '[name].[chunkhash].bundle.js' : '[name].[hash].bundle.js',
      sourceMapFilename: production ? '[name].[chunkhash].bundle.map' : '[name].[hash].bundle.map',
      chunkFilename: production ? '[name].[chunkhash].chunk.js' : '[name].[hash].chunk.js'
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules'),
      ],
      alias: {
        'src': path.resolve(__dirname, 'src'),
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
          'modal',
          'positioning',
          'radio',
          'select',
          'slider',
          'switch',
          'textarea',
        ].reduce((map, packageName) => {
          const mappedPackagedName = `@aurelia-ux/${packageName}`;
          map[mappedPackagedName] = path.resolve(__dirname, `../packages/${packageName}/src`);
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
        aureliaApp: undefined,
        entry: undefined,
        dist: 'es2015',
      }),
      new HtmlWebpackPlugin({ template: './index.ejs' })
    ]
  }
}
