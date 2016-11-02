import {FrameworkConfiguration} from 'aurelia-framework';
import {AureliaUX} from './aurelia-ux';

export function configure(config: FrameworkConfiguration, callback?: (config: AureliaUX) => Promise<any>) {
  config.globalResources([
    './button/ux-button'
  ]);

  let xp = <AureliaUX>config.container.get(AureliaUX);

  if (typeof callback === 'function') {
    return Promise.resolve(callback(xp))
      .then(() => xp.start(config));
  } else {
    xp.use.defaultConfiguration();
    return xp.start(config);
  }
}
