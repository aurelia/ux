import { FrameworkConfiguration } from 'aurelia-framework';
import { UxCard } from './ux-card';

export { UxCardTheme } from './ux-card-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources(UxCard);
}
