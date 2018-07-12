import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'form',
  [],
  process.env.NODE_ENV === 'production'
);
