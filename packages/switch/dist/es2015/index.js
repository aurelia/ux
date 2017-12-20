import { PLATFORM } from 'aurelia-framework';
export { UxSwitchTheme } from './ux-switch-theme';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('@aurelia-ux/switch/ux-switch')
    ]);
}
