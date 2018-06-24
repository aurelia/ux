import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'core',
  ['styles/normalize.css', 'effects/paper-ripple.css'],
  process.env.NODE_ENV === 'production'
);
