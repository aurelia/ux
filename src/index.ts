import {FrameworkConfiguration} from 'aurelia-framework';
import {AureliaUX} from './aurelia-ux';

export function configure(config: FrameworkConfiguration, callback?: (config: AureliaUX) => Promise<any>) {
  config.globalResources([
    './button/ux-button'
  ]);

  let ux = <AureliaUX>config.container.get(AureliaUX);

  if (typeof callback === 'function') {
    return Promise.resolve(callback(ux))
      .then(() => ux.start(config));
  } else {
    ux.use.defaultConfiguration();
    return ux.start(config);
  }
}
