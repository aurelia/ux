import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxSliderTheme } from './ux-slider-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/slider/ux-slider')
  ]);
}
