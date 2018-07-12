import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'input',
  [],
  process.env.NODE_ENV === 'production'
);
