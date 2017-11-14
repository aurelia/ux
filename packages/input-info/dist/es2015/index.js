import { PLATFORM } from 'aurelia-framework';
export { UxInputInfoTheme } from './ux-input-info-theme';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./ux-input-info')
    ]);
}
