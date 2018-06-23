import { FrameworkConfiguration, bindingMode, ObserverLocator } from 'aurelia-framework';
import { CheckedObserver, EventSubscriber } from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';
import { UxSwitch } from './ux-switch';

export { UxSwitchTheme } from './ux-switch-theme';
export { UxSwitch, UxSwitchElement } from './ux-switch';

export function configure(config: FrameworkConfiguration) {
  (config.container.get(AureliaUX) as AureliaUX).registerUxElementConfig(uxSwitchConfig);
  config.globalResources(UxSwitch);
}

const uxSwitchConfig = {
  tagName: 'ux-switch',
  properties: {
    checked: {
      defaultBindingMode: bindingMode.twoWay,
      getObserver(element: Element, _: string, observerLocator: ObserverLocator) {
        return new CheckedObserver(element, new EventSubscriber(['change']), observerLocator);
      }
    }
  }
};
