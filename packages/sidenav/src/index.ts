import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { UxSidenav } from './ux-sidenav/ux-sidenav';

export { UxSidenavTheme } from './ux-sidenav/ux-sidenav-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./ux-sidenav/ux-sidenav'),
    PLATFORM.moduleName('./ux-sidenav-content/ux-sidenav-content'),
    PLATFORM.moduleName('./ux-sidenav-drawer/ux-sidenav-drawer'),
  ]);
}

export { UxSidenav };
