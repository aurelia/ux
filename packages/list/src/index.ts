import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxListTheme } from './ux-list-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./ux-list'),
    PLATFORM.moduleName('./ux-list-item')
  ]);
}
