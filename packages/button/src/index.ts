import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { UxButton } from './ux-button';

export { UxButtonTheme } from './ux-button-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources(PLATFORM.moduleName('./ux-button'));
}

export { UxButton }
