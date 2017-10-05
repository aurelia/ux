import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxCheckboxTheme } from './ux-checkbox-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./ux-checkbox')
  ]);
}
