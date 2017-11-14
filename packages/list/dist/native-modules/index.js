import { PLATFORM } from 'aurelia-framework';
export { UxListTheme } from './ux-list-theme';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./ux-list'),
        PLATFORM.moduleName('./ux-list-item')
    ]);
}
