import {
  FrameworkConfiguration,
  PLATFORM,
} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./ux-menu'),
    PLATFORM.moduleName('./ux-menuitem')
  ]);
}
