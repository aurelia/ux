const path = require('path');
const karma = require('karma');
const webpack = require('webpack');
// @ts-ignore
// const { AureliaPlugin } = require('aurelia-webpack-plugin');

/**
 * @typedef KarmaConfigCustomOptions
 * @property {import('webpack').Configuration} webpack
 * @property {any} coverageIstanbulReporter
 * @property {any} webpackServer
 */

/**
 * @typedef {import('karma').Config & KarmaConfigCustomOptions & { package: string; }} KarmaConfig
 */
// export interface KarmaConfig extends karma.Config, KarmaConfigOptions {
//   package?: string;
//   set(config: KarmaConfigOptions): void;
// }

// export interface KarmaConfigOptions extends karma.ConfigOptions {
//   webpack: webpack.Configuration;
//   coverageIstanbulReporter: any;
//   webpackServer: any;
// }

const defaultOptions = {
  basePath: './',
  frameworks: ['jasmine'],
  files: ["test/**/*.spec.ts"],
  preprocessors: {
    "test/**/*.spec.ts": ["webpack", "sourcemap"]
  },
  webpack: {
    mode: 'development',
    resolve: {
      extensions: [".ts", ".js"],
      modules: ['src', 'test', 'node_modules'],
      alias: {
        src: path.resolve(__dirname, "src"),
        test: path.resolve(__dirname, 'test')
      },
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            configFile: 'tsconfig-test.json',
            transpileOnly: true
          }
        },
        {
          enforce: 'post',
          exclude: /(node_modules|\.spec\.ts$)/,
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true },
          test: /src[\/\\].+\.ts$/
        },
        {
          test: /\.css$/,
          loader: 'css-loader'
        }
      ]
    },
    plugins: [
      // new AureliaPlugin({
      //   aureliaApp: undefined,
      //   noHtmlLoader: true,
      //   noWebpackLoader: true
      // })
    ]
  },
  mime: {
    'text/x-typescript': ['ts']
  },
  reporters: ['mocha', 'progress', 'coverage-istanbul'],
  coverageIstanbulReporter: {
    reports: ['html', 'lcovonly', 'text-summary'],
    fixWebpackSourcePaths: true
  },
  webpackServer: { noInfo: true },
  port: 9876,
  colors: true,
  autoWatch: true,
  customLaunchers: {
    ChromeDebugging: {
      base: "Chrome",
      flags: ["--remote-debugging-port=9333"],
      debug: true
    },
  },
  browsers: ['ChromeHeadless'],
  singleRun: false,
  mochaReporter: {
    ignoreSkipped: true
  },
  webpackMiddleware: {
    logLevel: 'silent'
  },
};

/**
 * @param {KarmaConfig} config
 * @param {(options: import('karma').ConfigOptions & KarmaConfigCustomOptions) => void} configure
 */
exports.configureKarma = function(
  config,
  configure
) {
  const options = {
    ...defaultOptions,
    logLevel: config.LOG_INFO
  };

  if (typeof configure === 'function') {
    configure(options);
  }
  config.set(options);
}

/**
 * @param {import('karma').ConfigOptions & KarmaConfigCustomOptions} options
 */
exports.configureAliasCore = function(options) {
  options.webpack.resolve.alias['@aurelia-ux/core'] = path.resolve(__dirname, './packages/core/src');
}
