import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxRadioTheme } from './ux-radio-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./ux-radio')
  ]);
}
