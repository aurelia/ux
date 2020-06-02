import {
  FrameworkConfiguration,
  bindingMode,
  PLATFORM,
} from 'aurelia-framework';

import { ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';

import { AureliaUX } from '@aurelia-ux/core';
import { UxDefaultSelectConfiguration } from './ux-default-select-configuration';

export { UxOption, UxOptionElement } from './ux-option';
export { UxOptGroup, UxOptGroupElement } from './ux-optgroup';
export { UxSelect, UxSelectElement } from './ux-select';
export { UxSelectTheme } from './ux-select-theme';
export { UxDefaultSelectConfiguration };

export function configure(config: FrameworkConfiguration, callback?: (config: UxDefaultSelectConfiguration) => void) {
  config.container.get(AureliaUX).registerUxElementConfig(uxSelectConfig);
  config.globalResources([
    PLATFORM.moduleName('./ux-select'),
    PLATFORM.moduleName('./ux-optgroup'),
    PLATFORM.moduleName('./ux-option')
  ]);
  if (typeof callback === 'function') {
    const defaults = config.container.get(UxDefaultSelectConfiguration);
    callback(defaults);
  }
}

const uxSelectConfig = {
  tagName: 'ux-select',
  properties: {
    value: {
      defaultBindingMode: bindingMode.twoWay,
      getObserver(element: Element, _: string) {
        return new ValueAttributeObserver(element, 'value', new EventSubscriber(['change']));
      }
    }
  }
};
