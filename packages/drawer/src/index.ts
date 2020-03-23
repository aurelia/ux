import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxDrawerTheme } from './ux-drawer-theme';
export { UxDrawer } from './ux-drawer';
export * from './ux-modal-service';

export function configure(config: FrameworkConfiguration) {
  config.globalResources(PLATFORM.moduleName('./ux-drawer'));
}
