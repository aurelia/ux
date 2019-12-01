import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { UxIcon } from './ux-icon';

export { UxIconTheme } from './ux-icon-theme';
export { UxIcon };

export function configure(config: FrameworkConfiguration) {
  config.globalResources(PLATFORM.moduleName('./ux-icon'));
}
