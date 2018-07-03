import { FrameworkConfiguration, DOM } from 'aurelia-framework';
import { UxCard } from './ux-card';
import css from './ux-card.css';

export { UxCardTheme } from './ux-card-theme';

export function configure(config: FrameworkConfiguration) {
  DOM.injectStyles(css, undefined, undefined, 'ux-card-css');
  config.globalResources(UxCard);
}
