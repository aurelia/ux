import { DefaultDrawerConfiguration } from './drawer-configuration';
import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(frameworkConfig: FrameworkConfiguration, callback?: (config: DefaultDrawerConfiguration) => void) {
  frameworkConfig.globalResources([
    PLATFORM.moduleName('./resources/attach-focus-drawer-attribute'),
    PLATFORM.moduleName('./resources/dismiss-drawer-attribute'),
    PLATFORM.moduleName('./resources/ok-drawer-attribute'),
    PLATFORM.moduleName('./ux-drawer'),
  ]);
  const config = frameworkConfig.container.get(DefaultDrawerConfiguration);
  if (typeof callback === 'function') {
    console.log('ux-drawer set default configuration');
    callback(config);
  }

}

export { UxDrawerTheme } from './ux-drawer-theme';
export { UxDrawer } from './ux-drawer';
export * from './ux-modal-service';
export * from './drawer-configuration';
