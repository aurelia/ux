import {FrameworkConfiguration} from 'aurelia-framework';
import {AureliaXP} from './aurelia-xp';

export function configure(config: FrameworkConfiguration, callback?: (config: AureliaXP) => Promise<any>) {
  config.globalResources([
    './button/xp-button'
  ]);

  let xp = <AureliaXP>config.container.get(AureliaXP);

  if (typeof callback === 'function') {
    return callback(xp);
  } else {
    xp.use.defaultConfiguration();
    return xp.start();
  }
}
