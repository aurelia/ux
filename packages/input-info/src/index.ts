import { FrameworkConfiguration } from 'aurelia-framework';
import { UxInputInfo } from './ux-input-info';

export { UxInputInfoTheme } from './ux-input-info-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources(UxInputInfo);
}
