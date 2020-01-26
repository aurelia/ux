import { PLATFORM } from 'aurelia-framework';
export { UxDatepickerTheme } from './ux-datepicker-theme';
export { UxCalendar } from './ux-calendar';
export { UxDatepicker } from './ux-datepicker';
export { UxPickerDialog } from './ux-picker-dialog';
export { UxYearList } from './ux-year-list';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./ux-calendar'),
        PLATFORM.moduleName('./ux-datepicker'),
        PLATFORM.moduleName('./ux-picker-dialog'),
        PLATFORM.moduleName('./ux-year-list')
    ]);
}
//# sourceMappingURL=index.js.map