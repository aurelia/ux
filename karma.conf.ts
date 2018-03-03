import * as karma from 'karma';
import * as webpack from 'webpack';

export interface KarmaConfig extends karma.Config, KarmaConfigOptions {
  set(config: KarmaConfigOptions): void;
}

export interface KarmaConfigOptions extends karma.ConfigOptions {
  webpack: WebpackConfiguration;
  coverageIstanbulReporter: any;
  webpackServer: any;
}

// remove this when @types/webpack is updated to reflect this webpack 4.0 change
export interface WebpackConfiguration extends webpack.Configuration {
  mode: 'development' | 'production';
}

export default (config: KarmaConfig): void => {
  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    files: ['test/setup.ts'],
    preprocessors: {
      'test/setup.ts': ['webpack', 'sourcemap']
    },
    webpack: {
      mode: 'development',
      resolve: {
        extensions: ['.ts', '.js'],
        modules: ['src', 'node_modules']
      },
      devtool: 'cheap-module-eval-source-map',
      module: {
        rules: [
          {
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
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
      }
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
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false
  });
};
