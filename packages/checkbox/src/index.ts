import { FrameworkConfiguration, PLATFORM, bindingMode, ObserverLocator, CheckedObserver } from 'aurelia-framework';
import { AureliaUX } from '@aurelia-ux/core';

export { UxCheckboxTheme } from './ux-checkbox-theme';

export function configure(config: FrameworkConfiguration) {
  config.container.get(AureliaUX).registerUxElementConfig(uxCheckBoxConfig);
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/checkbox/ux-checkbox')
  ]);
}

const uxCheckBoxConfig = {
  tagName: 'ux-checkbox',
  properties: {
    value: {
      defaultBindingMode: bindingMode.twoWay,
      getObserver(element: Element, _: string, observerLocator: ObserverLocator) {
        return new CheckedObserver(element, uxCheckboxChangeHandler, observerLocator);
      }
    }
  }
};

const uxCheckboxChangeHandler = {
  subscribe(target: Element, callbackOrListener: EventListenerOrEventListenerObject) {
    target.addEventListener('change', callbackOrListener, false);

    return function() {
      target.removeEventListener('change', callbackOrListener, false);
    };
  }
};
