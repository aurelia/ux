import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { DatepickerSettings } from './resources/datepicker-settings';

export { UxDatepickerTheme } from './ux-datepicker-theme';
export { UxCalendar } from './ux-calendar';
export { UxPickerDialog } from './ux-picker-dialog';
export { UxYearList } from './ux-year-list';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/datepicker/ux-calendar'),
    PLATFORM.moduleName('@aurelia-ux/datepicker/ux-datepicker'),
    PLATFORM.moduleName('@aurelia-ux/datepicker/ux-picker-dialog'),
    PLATFORM.moduleName('@aurelia-ux/datepicker/ux-year-list')
  ]);
}
