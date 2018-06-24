import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'select',
  'ux-select.css',
  process.env.NODE_ENV === 'production'
);
