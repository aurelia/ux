import {
  FrameworkConfiguration,
  PLATFORM,
  bindingMode,
} from 'aurelia-framework';

import * as AuBinding from 'aurelia-binding';

import { AureliaUX } from '@aurelia-ux/core';

export { UxOption, UxOptionElement } from './ux-option';
export { UxOptGroup, UxOptGroupElement } from './ux-optgroup';
export { UxSelect, UxSelectElement } from './ux-select';
export { UxSelectTheme } from './ux-select-theme';

export function configure(config: FrameworkConfiguration) {
  config.container.get(AureliaUX).registerUxElementConfig(uxSelectConfig);
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/select/ux-select'),
    PLATFORM.moduleName('@aurelia-ux/select/ux-optgroup'),
    PLATFORM.moduleName('@aurelia-ux/select/ux-option')
  ]);
}

const uxSelectConfig = {
  tagName: 'ux-select',
  properties: {
    value: {
      defaultBindingMode: bindingMode.twoWay,
      getObserver(element: Element, _: string) {
        return new (AuBinding as any).ValueAttributeObserver(element, 'value', uxSelectChangeHandler);
      }
    }
  }
};

const uxSelectChangeHandler = {
  subscribe(target: Element, callbackOrListener: EventListenerOrEventListenerObject) {
    target.addEventListener('change', callbackOrListener, false);

    return function() {
      target.removeEventListener('change', callbackOrListener, false);
    };
  }
};
