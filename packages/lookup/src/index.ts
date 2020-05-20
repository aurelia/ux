import {
  FrameworkConfiguration,
  bindingMode,
  PLATFORM,
} from 'aurelia-framework';

import { ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';

import { AureliaUX } from '@aurelia-ux/core';
import { UxDefaultLookupConfiguration } from './ux-lookup-configuration';

export { UxLookup  } from './ux-lookup';
export { UxLookupTheme } from './ux-lookup-theme';

export function configure(frameworkConfig: FrameworkConfiguration, callback?: (config: UxDefaultLookupConfiguration) => void) {
  frameworkConfig.container.get(AureliaUX).registerUxElementConfig(uxLookupConfig);
  frameworkConfig.globalResources([
    PLATFORM.moduleName('./ux-lookup')
  ]);
  if (typeof callback === 'function') {
    const config = frameworkConfig.container.get(UxDefaultLookupConfiguration);
    callback(config);
  }
}

const uxLookupConfig = {
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
