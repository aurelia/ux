import { FrameworkConfiguration } from 'aurelia-framework';
import { AureliaUX } from './aurelia-ux';

export { swatches } from './colors/swatches';
export { shadows } from './colors/shadows';
export { processDesignAttributes } from './designs/design-attributes';

export { Themable } from './styles/themable';
export { StyleEngine } from './styles/style-engine';

export * from './styles/decorators';

export { AureliaUX } from './aurelia-ux';
export { UXConfiguration } from './ux-configuration';

export function configure(config: FrameworkConfiguration, callback?: (config: AureliaUX) => Promise<any>) {
  const ux = config.container.get(AureliaUX) as AureliaUX;

  if (typeof callback === 'function') {
    return Promise.resolve(callback(ux))
      .then(() => ux.start(config));
  } else {
    ux.use.defaultConfiguration();
    return ux.start(config);
  }
}
