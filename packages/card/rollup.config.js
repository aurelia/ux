import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'card',
  [],
  process.env.NODE_ENV === 'production'
);
