import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'radio',
  'ux-radio.css',
  process.env.NODE_ENV === 'production'
);
