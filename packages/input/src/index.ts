import { FrameworkConfiguration, PLATFORM, bindingMode } from 'aurelia-framework';
import { AureliaUX } from '@aurelia-ux/core';

export { UxInputTheme } from './ux-input-theme';

export function configure(config: FrameworkConfiguration) {
  const ux = config.container.get(AureliaUX);
  ux.registerUxElementConfig({
    tagName: 'ux-input',
    event: 'change',
    propertyName: 'value',
    mode: bindingMode.twoWay
  });
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/input/ux-input')
  ]);
}
