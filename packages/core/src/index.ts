import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

import { AureliaUX } from './aurelia-ux';
import './extension';

export { swatches } from './colors/swatches';
export { shadows } from './colors/shadows';
export { processDesignAttributes } from './designs/design-attributes';

export { PaperRipple } from './effects/paper-ripple';

export { normalizeBooleanAttribute } from './components/html-attributes';
export { UxComponent } from './components/ux-component';
export { linkProperty } from './components/link-property';

export { UxTheme } from './styles/ux-theme';
export { StyleEngine } from './styles/style-engine';
export { GlobalStyle } from './styles/global-style';
export { GlobalStyleEngine } from './styles/global-style-engine';

export { AureliaUX } from './aurelia-ux';
export { UXConfiguration } from './ux-configuration';

export function configure(config: FrameworkConfiguration, callback?: (config: AureliaUX) => Promise<any>) {
  const ux = config.container.get(AureliaUX) as AureliaUX;

  config.globalResources([
    PLATFORM.moduleName('./components/boolean-attr-binding-behavior')
  ]);

  if (typeof callback === 'function') {
    return Promise.resolve(callback(ux))
      .then(() => ux.start(config));
  } else {
    ux.use.defaultConfiguration();
    return ux.start(config);
  }
}
