import { PLATFORM } from 'aurelia-framework';
export { UxInputTheme } from './ux-input-theme';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./ux-input')
    ]);
}
