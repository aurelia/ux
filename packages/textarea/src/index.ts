import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxTextareaTheme } from './ux-textarea-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/textarea/ux-textarea')
  ]);
}
