import { BindingBehaviorResource, FrameworkConfiguration, PLATFORM, ViewResources } from 'aurelia-framework';

import { AureliaUX } from './aurelia-ux';
import { BooleanBB } from './components/boolean-attr-binding-behavior';

export { swatches } from './colors/swatches';
export { shadows } from './colors/shadows';
export { processDesignAttributes } from './designs/design-attributes';

export { PaperRipple } from './effects/paper-ripple';

export { normalizeBooleanAttribute } from './components/html-attributes';
export { UxComponent } from './components/ux-component';

export { UxTheme } from './styles/ux-theme';
export { StyleEngine } from './styles/style-engine';
export { GlobalStyle } from './styles/global-style';
export { GlobalStyleEngine } from './styles/global-style-engine';

export { AureliaUX } from './aurelia-ux';
export { UXConfiguration } from './ux-configuration';

let uxCorePromise: Promise<AureliaUX>;

export function configure(config: FrameworkConfiguration, callback?: (config: AureliaUX) => Promise<any>) {
  if (uxCorePromise) {
    return uxCorePromise;
  }
  const ux: AureliaUX = config.container.get(AureliaUX);
  const boolAttr = new BindingBehaviorResource('');
  boolAttr.initialize(config.container, BooleanBB);
  boolAttr.register(config.aurelia.resources, 'booleanAttr');

  if (typeof callback === 'function') {
    return uxCorePromise = Promise.resolve(callback(ux))
      .then(() => ux.start(config));
  } else {
    ux.use.defaultConfiguration();
    return uxCorePromise = ux.start(config);
  }
}
