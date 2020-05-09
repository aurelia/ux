import { PLATFORM } from 'aurelia-framework';
import { UxProgress } from './ux-progress';
export { UxProgressTheme } from './ux-progress-theme';
export function configure(config) {
    config.globalResources(PLATFORM.moduleName('./ux-progress'));
}
export { UxProgress };
//# sourceMappingURL=index.js.map