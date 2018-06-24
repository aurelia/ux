import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'card',
  'ux-card.css',
  process.env.NODE_ENV === 'production'
);
