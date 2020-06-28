import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxPopup } from './ux-popup';
export { UxPopupTheme } from './ux-popup-theme';

export function configure(frameworkConfig: FrameworkConfiguration) {
  frameworkConfig.globalResources([
    PLATFORM.moduleName('./ux-popup')
  ]);
}
