import { FrameworkConfiguration, PLATFORM, bindingMode, ObserverLocator, CheckedObserver } from 'aurelia-framework';
import { AureliaUX } from '@aurelia-ux/core';

export { UxSwitchTheme } from './ux-switch-theme';
export { UxSwitch, UxSwitchElement } from './ux-switch';

export function configure(config: FrameworkConfiguration) {
  config.container.get(AureliaUX).registerUxElementConfig(uxSwitchConfig);
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/switch/ux-switch')
  ]);
}

const uxSwitchConfig = {
  tagName: 'ux-switch',
  properties: {
    checked: {
      defaultBindingMode: bindingMode.twoWay,
      getObserver(element: Element, _: string, observerLocator: ObserverLocator) {
        return new CheckedObserver(element, uxSwitchChangeHandler, observerLocator);
      }
    }
  }
};

const uxSwitchChangeHandler = {
  subscribe(target: Element, callbackOrListener: EventListenerOrEventListenerObject) {
    target.addEventListener('change', callbackOrListener, false);

    return function() {
      target.removeEventListener('change', callbackOrListener, false);
    };
  }
};
