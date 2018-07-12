import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'textarea',
  [],
  process.env.NODE_ENV === 'production'
);
