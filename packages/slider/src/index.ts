import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxSliderTheme } from './ux-slider-theme';
export { UxSlider, UxSliderElement } from './ux-slider';

export function configure(config: FrameworkConfiguration) {
  config.globalResources(PLATFORM.moduleName('./ux-slider'));
}
