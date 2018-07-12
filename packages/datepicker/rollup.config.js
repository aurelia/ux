import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'datepicker',
  [],
  process.env.NODE_ENV === 'production'
);
