import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'datepicker',
  ['ux-datepicker.css', 'ux-calendar.css', 'ux-picker-dialog.css', 'ux-year-list.css'],
  process.env.NODE_ENV === 'production'
);
