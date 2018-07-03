import { FrameworkConfiguration, DOM } from 'aurelia-framework';
import { UxGrid } from './ux-grid';
import css from './ux-grid.css';

export { UxGridTheme } from './ux-grid-theme';
export { UxResponsiveUtilities } from './ux-responsive-utilities';

export function configure(config: FrameworkConfiguration) {
  DOM.injectStyles(css, undefined, undefined, 'ux-grid-css');
  config.globalResources(UxGrid);
}
