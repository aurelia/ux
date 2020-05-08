import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { UxProgress } from './ux-progress';

export { UxProgressTheme } from './ux-progress-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources(PLATFORM.moduleName('./ux-progress'));
}

export { UxProgress };
