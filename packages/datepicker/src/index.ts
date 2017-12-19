import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { DatepickerSettings } from './resources/datepicker-settings';

export { UxDatepickerTheme } from './ux-datepicker-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/datepicker/ux-calendar'),
    PLATFORM.moduleName('@aurelia-ux/datepicker/ux-datepicker'),
    PLATFORM.moduleName('@aurelia-ux/datepicker/ux-picker-dialog'),
    PLATFORM.moduleName('@aurelia-ux/datepicker/ux-year-list')
  ]);
}
