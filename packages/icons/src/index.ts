import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxIconTheme } from './ux-icon-theme';
export { UxIcon } from './ux-icon';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/icons/ux-icon')
  ]);
}
