import { FrameworkConfiguration, DOM } from 'aurelia-framework';
import { UxCalendar } from './ux-calendar';
import { UxDatepicker } from './ux-datepicker';
import { UxPickerDialog } from './ux-picker-dialog';
import { UxYearList } from './ux-year-list';
import cldCss from './ux-calendar.css';
import dpCss from './ux-datepicker.css';
import pdCss from './ux-picker-dialog.css';
import ylCss from './ux-year-list.css';

export { DatepickerSettings } from './resources/datepicker-settings';

export { UxDatepickerTheme } from './ux-datepicker-theme';

export function configure(config: FrameworkConfiguration) {
  DOM.injectStyles(cldCss + dpCss + pdCss + ylCss, undefined, undefined, 'ux-datepicker-css');
  config.globalResources([
    UxCalendar,
    UxDatepicker,
    UxPickerDialog,
    UxYearList
  ]);
}
