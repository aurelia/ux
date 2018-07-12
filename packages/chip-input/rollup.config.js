import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'chip-input',
  [],
  process.env.NODE_ENV === 'production'
);
