import { PLATFORM } from 'aurelia-framework';
export { UxButtonTheme } from './ux-button-theme';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./ux-button')
    ]);
}
