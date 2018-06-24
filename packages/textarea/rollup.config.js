import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'textarea',
  'ux-textarea.css',
  process.env.NODE_ENV === 'production'
);
