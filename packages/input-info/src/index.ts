/// <reference path="html.d.ts" />
import { FrameworkConfiguration } from 'aurelia-framework';
import { UxInputInfo } from './ux-input-info';

export { UxInputInfo };
export { UxInputInfoTheme } from './ux-input-info-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources(UxInputInfo);
}
