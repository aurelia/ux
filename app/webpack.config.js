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
      // note that following config is for webpack aliasing to source code
      // it won't be necessary for real app
      new AureliaWebpackPlugin.ModuleDependenciesPlugin({
        '@aurelia-ux/button': [
          './ux-button.html'
        ],
        '@aurelia-ux/card': [
          './ux-card-action-row.html',
          './ux-card-content.html',
          './ux-card-footer.html',
          './ux-card-header.html',
          './ux-card.html'
        ],
        '@aurelia-ux/checkbox': [
          './ux-checkbox.html'
        ],
        '@aurelia-ux/chip-input': [
          './ux-chip-input.html',
          './ux-chip.html'
        ],
        "@aurelia-ux/datepicker": [
          "./ux-calendar.html",
          "./ux-datepicker.html",
          "./ux-picker-dialog.html",
          "./ux-year-list.html",
        ],
        '@aurelia-ux/form': [
          './ux-field.html',
          './ux-form.html'
        ],
        '@aurelia-ux/grid': [
          './ux-grid-cell.html',
          './ux-grid.html'
        ],
        '@aurelia-ux/icons': [
          './ux-icon.html'
        ],
        '@aurelia-ux/input': [
          './ux-input.html'
        ],
        '@aurelia-ux/input-info': [
          './ux-input-info.html'
        ],
        '@aurelia-ux/list': [
          './ux-list-item.html',
          './ux-list.html'
        ],
        '@aurelia-ux/radio': [
          './ux-radio.html'
        ],
        '@aurelia-ux/select': [
          './ux-optgroup.html',
          './ux-option.html',
          './ux-select.html'
        ],
        '@aurelia-ux/slider': [
          './ux-slider.html'
        ],
        '@aurelia-ux/switch': [
          './ux-switch.html'
        ],
        '@aurelia-ux/textarea': [
          './ux-textarea.html'
        ],
      }),
      new HtmlWebpackPlugin({

        template: './index.ejs'
      })
    ]
  }
}
