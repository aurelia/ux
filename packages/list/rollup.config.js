import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'list',
  [],
  process.env.NODE_ENV === 'production'
);
