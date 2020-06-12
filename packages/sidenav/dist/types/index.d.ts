import { FrameworkConfiguration } from 'aurelia-framework';
import { UxSidenav } from './ux-sidenav/ux-sidenav';
import { UxDefaultSidenavConfiguration } from './ux-default-sidenav-configuration';
export { UxSidenavTheme } from './ux-sidenav/ux-sidenav-theme';
export { IUxSidenavElement } from './ux-sidenav/i-ux-sidenav-element';
export { IUxSidenavDrawerElement } from './ux-sidenav-drawer/i-ux-sidenav-drawer-element';
export declare function configure(config: FrameworkConfiguration, callback?: (config: UxDefaultSidenavConfiguration) => void): void;
export { UxSidenav, UxDefaultSidenavConfiguration };
