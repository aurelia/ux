import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxButtonTheme } from './ux-button-theme';
export { UxButton } from './ux-button';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/button/ux-button')
  ]);
}
