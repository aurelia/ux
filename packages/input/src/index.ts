import { FrameworkConfiguration, bindingMode, PLATFORM } from 'aurelia-framework';
import { ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';
import { UxDefaultInputConfiguration } from './ux-default-input-configuration';

export { UxInputTheme } from './ux-input-theme';
export { UxInput, UxInputElement } from './ux-input';
export { UxDefaultInputConfiguration };

export function configure(config: FrameworkConfiguration, callback?: (config: UxDefaultInputConfiguration) => void) {
  config.container.get(AureliaUX).registerUxElementConfig(uxInputConfig);
  config.globalResources(PLATFORM.moduleName('./ux-input'));
  if (typeof callback === 'function') {
    const defaults = config.container.get(UxDefaultInputConfiguration);
    callback(defaults);
  }
}

const uxInputConfig = {
  tagName: 'ux-input',
  properties: {
    value: {
      defaultBindingMode: bindingMode.twoWay,
      getObserver(element: Element) {
        return new ValueAttributeObserver(element, 'value', new EventSubscriber(['change']));
      }
    }
  }
};
