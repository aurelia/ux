import { FrameworkConfiguration, DOM } from 'aurelia-framework';
import { UxList } from './ux-list';
import { UxListItem } from './ux-list-item';
import css from './ux-list.css';

export { UxListTheme } from './ux-list-theme';

export function configure(config: FrameworkConfiguration) {
  DOM.injectStyles(css, undefined, undefined, 'ux-list-css');
  config.globalResources([
    UxList,
    UxListItem
  ]);
}
