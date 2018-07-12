import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'select',
  [],
  process.env.NODE_ENV === 'production'
);
