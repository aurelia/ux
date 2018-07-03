import { FrameworkConfiguration, DOM } from 'aurelia-framework';
import { UxButton } from './ux-button';
import css from './ux-button.css';

export { UxButtonTheme } from './ux-button-theme';

export function configure(config: FrameworkConfiguration) {
  DOM.injectStyles(css, undefined, undefined, 'ux-button-css');
  config.globalResources(UxButton);
}
