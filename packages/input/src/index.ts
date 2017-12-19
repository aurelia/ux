import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxInputTheme } from './ux-input-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/input/ux-input')
  ]);
}
