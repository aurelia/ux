import { configRollup } from '../../rollup-utilities';

export default configRollup(
  'chip-input',
  ['ux-chip-input.css', 'ux-tag.css', 'ux-chip.css'],
  process.env.NODE_ENV === 'production'
);
