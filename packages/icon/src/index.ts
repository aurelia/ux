import { FrameworkConfiguration, DOM } from 'aurelia-framework';
import { UxIcon } from './ux-icon';
import css from './ux-icon.css';

export { UxIconTheme } from './ux-icon-theme';

export function configure(config: FrameworkConfiguration) {
  DOM.injectStyles(css, undefined, undefined, 'ux-icon-css');
  config.globalResources(UxIcon);
}
