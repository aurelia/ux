import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxButtonTheme } from './ux-button-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./ux-button')
  ]);
}
