import * as karma from 'karma';
import * as webpack from 'webpack';

export interface KarmaConfig extends karma.Config, KarmaConfigOptions {
  package?: string;
  set(config: KarmaConfigOptions): void;
}

export interface KarmaConfigOptions extends karma.ConfigOptions {
  webpack: webpack.Configuration;
  coverageIstanbulReporter: any;
  webpackServer: any;
}

const defaultOptions: KarmaConfigOptions = {
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
  autoWatch: true,
  browsers: ['Chrome'],
  singleRun: false
};

export function configureKarma(
  config: KarmaConfig,
  configure?: (options: KarmaConfigOptions) => void
): void {
  const options = { ...defaultOptions };
  // config.package contains the value passed in via "karma start --package=..."
  // only need to set this when running from the root
  if (config.package) {
    options.basePath = `./packages/${config.package}`;
  }

  options.logLevel = config.LOG_INFO;

  if (typeof configure === 'function') {
    configure(options);
  }
  config.set(options);
}

export default (config: KarmaConfig): void => {
  configureKarma(config, (options: KarmaConfigOptions) => {
    (options.webpack.module as any).rules[0].options.configFile = 'tsconfig.json';
  });
};
