import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'checkbox',
  [],
  process.env.NODE_ENV === 'production'
);
