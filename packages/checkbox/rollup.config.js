import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'checkbox',
  'ux-checkbox.css',
  process.env.NODE_ENV === 'production'
);
