import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'grid',
  [],
  process.env.NODE_ENV === 'production'
);
