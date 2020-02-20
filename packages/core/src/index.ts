import { BindingBehaviorResource, FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

import { AureliaUX } from './aurelia-ux';
import { BooleanBB } from './components/boolean-attr-binding-behavior';

export { swatches } from './colors/swatches';
export { shadows } from './colors/shadows';
export { processDesignAttributes } from './designs/design-attributes';

export { PaperRipple } from './effects/paper-ripple';

export { normalizeBooleanAttribute } from './components/html-attributes';
export { getBackgroundColorThroughParents } from './components/background-color-parent';
export { UxComponent } from './components/ux-component';
export { UxInputComponent } from './components/ux-input-component';
export { UxChoiceAttribute } from './components/ux-choice-attribute';
export { UxChoiceContainerAttribute } from './components/ux-choice-container-attribute';

export { Design } from './designs/design';
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
  config.globalResources([
    PLATFORM.moduleName('./components/ux-choice-attribute'),
    PLATFORM.moduleName('./components/ux-choice-container-attribute')
  ]);

  if (typeof callback === 'function') {
    return uxCorePromise = Promise.resolve(callback(ux))
      .then(() => ux.start(config));
  } else {
    ux.use.defaultConfiguration();
    return uxCorePromise = ux.start(config);
  }
}
