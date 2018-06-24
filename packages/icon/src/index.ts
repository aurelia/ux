import { FrameworkConfiguration } from 'aurelia-framework';
import { UxIcon } from './ux-icon';

export { UxIconTheme } from './ux-icon-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources(UxIcon);
}
