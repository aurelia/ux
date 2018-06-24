import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'icon',
  'ux-icon.css',
  process.env.NODE_ENV === 'production'
);
