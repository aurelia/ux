import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'switch',
  'ux-switch.css',
  process.env.NODE_ENV === 'production'
);
