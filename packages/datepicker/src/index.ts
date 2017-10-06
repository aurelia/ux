import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { DatepickerSettings } from './resources/datepicker-settings';

export { UxDatepickerTheme } from './ux-datepicker-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./ux-calendar'),
    PLATFORM.moduleName('./ux-datepicker'),
    PLATFORM.moduleName('./ux-picker-dialog'),
    PLATFORM.moduleName('./ux-year-list')
  ]);
}
