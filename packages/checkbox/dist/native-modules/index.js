import { PLATFORM } from 'aurelia-framework';
export { UxCheckboxTheme } from './ux-checkbox-theme';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./ux-checkbox')
    ]);
}
