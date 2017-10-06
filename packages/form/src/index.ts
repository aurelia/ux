import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxFormTheme } from './ux-form-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./ux-field'),
    PLATFORM.moduleName('./ux-form'),
    PLATFORM.moduleName('./ux-submit-attribute')
  ]);
}
