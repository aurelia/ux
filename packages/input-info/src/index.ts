import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxInputInfoTheme } from './ux-input-info-theme';
export { UxInputInfo } from './ux-input-info';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/input-info/ux-input-info')
  ]);
}
