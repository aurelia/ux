const path = require('path');
const karma = require('karma');
const webpack = require('webpack');
// @ts-ignore
// const { AureliaPlugin } = require('aurelia-webpack-plugin');

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
  files: ["test/**/*.spec.ts", "test/**/*.spec.tsx"],
  preprocessors: {
    "test/**/*.spec.ts": ["webpack", "sourcemap"],
    "test/**/*.spec.tsx": ["webpack", "sourcemap"]
  },
  webpack: {
    mode: 'development',
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".css"],
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
            // compilerOptions: {
            //   sourceMap: true,
            // },
            transpileOnly: true
          }
        },
        {
          enforce: 'post',
          exclude: /(node_modules|\.spec\.ts$)/,
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true },
          test: /src[\/\\].+\.ts$/
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
 * @param {Karmaconfig} config
 * @param {KarmaConfigureOptions} configure
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
