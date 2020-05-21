import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { UxExpandable } from './ux-expandable';

export { UxExpandableTheme } from './ux-expandable-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources(PLATFORM.moduleName('./ux-expandable'));
}

export { UxExpandable };
