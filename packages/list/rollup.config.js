import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'list',
  'ux-list.css',
  process.env.NODE_ENV === 'production'
);
