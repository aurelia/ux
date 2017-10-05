import { FrameworkConfiguration } from 'aurelia-framework';
import { AureliaUX } from './aurelia-ux';

export { swatches } from './colors/swatches';
export { shadows } from './colors/shadows';
export { processDesignAttributes } from './designs/design-attributes';

export { UxComponent } from './components/ux-component';

export { UxTheme } from './styles/ux-theme';
export { StyleEngine } from './styles/style-engine';

export { AureliaUX } from './aurelia-ux';

export function configure(config: FrameworkConfiguration, callback?: (config: AureliaUX) => Promise<any>) {
  const ux = config.container.get(AureliaUX) as AureliaUX;

  if (typeof callback === 'function') {
    return Promise.resolve(callback(ux))
      .then(() => ux.start(config));
  } else {
    return ux.start(config);
  }
}
