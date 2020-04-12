import { OkModalAttribute } from './resources/ok-modal-attribute';
import { DismissModalAttribute } from './resources/dismiss-modal-attribute';
import { AttachFocusAttribute } from './resources/attach-focus-attribute';
import { UxDefaultModalConfiguration } from './ux-modal-configuration';
import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(frameworkConfig: FrameworkConfiguration, callback?: (config: UxDefaultModalConfiguration) => void) {
  frameworkConfig.globalResources([
    AttachFocusAttribute,
    DismissModalAttribute,
    OkModalAttribute, 
    PLATFORM.moduleName('./ux-modal'),
  ]);
  const config = frameworkConfig.container.get(UxDefaultModalConfiguration);
  if (typeof callback === 'function') {
    callback(config);
  }

}

export { UxModalTheme } from './ux-modal-theme';
export { UxModal } from './ux-modal';
export * from './ux-modal-service';
export * from './ux-modal-configuration';
export * from './positioning/interfaces';
export * from './positioning/ux-modal-positioning';
