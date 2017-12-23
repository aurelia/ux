import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxSelectTheme } from './ux-select-theme'

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./ux-select')
  ]);
}