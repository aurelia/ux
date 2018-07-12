import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'input-info',
  [],
  process.env.NODE_ENV === 'production'
);
