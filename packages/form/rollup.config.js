import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'form',
  'ux-form.css',
  process.env.NODE_ENV === 'production'
);
