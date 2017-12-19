import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxSwitchTheme } from './ux-switch-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/switch/ux-switch')
  ]);
}
