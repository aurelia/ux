import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxIconTheme } from './ux-icon-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./ux-icon')
  ]);
}
