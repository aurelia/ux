import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'core',
  ['styles/normalize.css'],
  process.env.NODE_ENV === 'production'
);
