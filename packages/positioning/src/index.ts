import { UxPositioningConfiguration } from './interfaces';
import { FrameworkConfiguration } from 'aurelia-framework';

export function configure(
  frameworkConfig: FrameworkConfiguration, 
  callback?: (config: UxPositioningConfiguration) => void) {

  if (typeof callback === 'function') {
    const config = frameworkConfig.container.get(UxPositioningConfiguration);
    callback(config);
  }
}

export * from './interfaces';
export * from './ux-positioning';
