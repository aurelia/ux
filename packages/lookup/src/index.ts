import {
  FrameworkConfiguration,
  bindingMode,
  PLATFORM,
} from 'aurelia-framework';

import { ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';

import { AureliaUX } from '@aurelia-ux/core';

export { UxLookup  } from './ux-lookup';
export { UxLookupTheme } from './ux-lookup-theme';

export function configure(config: FrameworkConfiguration) {
  config.container.get(AureliaUX).registerUxElementConfig(uxSelectConfig);
  config.globalResources([
    PLATFORM.moduleName('./ux-lookup')
  ]);
}

const uxSelectConfig = {
  tagName: 'ux-lookup',
  properties: {
    value: {
      defaultBindingMode: bindingMode.twoWay,
      getObserver(element: Element, _: string) {
        return new ValueAttributeObserver(element, 'value', new EventSubscriber(['change']));
      }
    }
  }
};
