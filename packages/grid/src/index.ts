import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxBoilerplateTheme } from './ux-boilerplate-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/boilerplate/ux-boilerplate')
  ]);
}
