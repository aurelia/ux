import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'grid',
  'ux-grid.css',
  process.env.NODE_ENV === 'production'
);
