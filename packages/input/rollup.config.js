import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'input',
  'ux-input.css',
  process.env.NODE_ENV === 'production'
);
