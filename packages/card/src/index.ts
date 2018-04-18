import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxCardTheme } from './ux-card-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/card/card')
  ]);
}
