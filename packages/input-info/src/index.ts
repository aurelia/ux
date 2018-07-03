import { FrameworkConfiguration, DOM } from 'aurelia-framework';
import { UxInputInfo } from './ux-input-info';

export { UxInputInfoTheme } from './ux-input-info-theme';
import css from './ux-input-info.css';

export function configure(config: FrameworkConfiguration) {
  DOM.injectStyles(css, undefined, false, 'ux-input-info');
  config.globalResources(UxInputInfo);
}
