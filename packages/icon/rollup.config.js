import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'icon',
  [],
  process.env.NODE_ENV === 'production'
);
