import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'radio',
  [],
  process.env.NODE_ENV === 'production'
);
