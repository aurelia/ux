import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'button',
  [],
  process.env.NODE_ENV === 'production'
);
