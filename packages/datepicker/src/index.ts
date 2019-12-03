import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
export { DatepickerSettings } from './resources/datepicker-settings';
export { UxDatepickerTheme } from './ux-datepicker-theme';
export { UxCalendar } from './ux-calendar';
export { UxDatepicker } from './ux-datepicker';
export { UxPickerDialog } from './ux-picker-dialog';
export { UxYearList } from './ux-year-list';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./ux-calendar'),
    PLATFORM.moduleName('./ux-datepicker'),
    PLATFORM.moduleName('./ux-picker-dialog'),
    PLATFORM.moduleName('./ux-year-list')
  ]);
}
