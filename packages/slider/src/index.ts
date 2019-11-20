/// <reference path="html.d.ts" />
import { FrameworkConfiguration } from 'aurelia-framework';
import { UxSlider } from './ux-slider';

export { UxSliderTheme } from './ux-slider-theme';
export { UxSlider, UxSliderElement } from './ux-slider';

export function configure(config: FrameworkConfiguration) {
  config.globalResources(UxSlider);
}
