import { PLATFORM } from 'aurelia-framework';
export { UxDatepickerTheme } from './ux-datepicker-theme';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./ux-calendar'),
        PLATFORM.moduleName('./ux-datepicker'),
        PLATFORM.moduleName('./ux-picker-dialog'),
        PLATFORM.moduleName('./ux-year-list')
    ]);
}
