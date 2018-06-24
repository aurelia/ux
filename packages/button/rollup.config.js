import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'button',
  'ux-button.css',
  process.env.NODE_ENV === 'production'
);
