import { PLATFORM } from 'aurelia-framework';
export { UxDatepickerTheme } from './ux-datepicker-theme';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('@aurelia-ux/datepicker/ux-calendar'),
        PLATFORM.moduleName('@aurelia-ux/datepicker/ux-datepicker'),
        PLATFORM.moduleName('@aurelia-ux/datepicker/ux-picker-dialog'),
        PLATFORM.moduleName('@aurelia-ux/datepicker/ux-year-list')
    ]);
}
