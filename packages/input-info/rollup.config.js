import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'input-info',
  'ux-input-info.css',
  process.env.NODE_ENV === 'production'
);
