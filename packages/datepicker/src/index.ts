import { FrameworkConfiguration } from 'aurelia-framework';
import { UxCalendar } from './ux-calendar';
import { UxDatepicker } from './ux-datepicker';
import { UxPickerDialog } from './ux-picker-dialog';
import { UxYearList } from './ux-year-list';

export { DatepickerSettings } from './resources/datepicker-settings';

export { UxDatepickerTheme } from './ux-datepicker-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    UxCalendar,
    UxDatepicker,
    UxPickerDialog,
    UxYearList
  ]);
}
