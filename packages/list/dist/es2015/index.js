import { PLATFORM } from 'aurelia-framework';
export { UxListTheme } from './ux-list-theme';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('@aurelia-ux/list/ux-list'),
        PLATFORM.moduleName('@aurelia-ux/list/ux-list-item')
    ]);
}
