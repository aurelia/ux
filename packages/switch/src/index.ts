import { FrameworkConfiguration, bindingMode, ObserverLocator, PLATFORM } from 'aurelia-framework';
import { CheckedObserver, EventSubscriber } from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';

export { UxSwitchTheme } from './ux-switch-theme';
export { UxSwitch, UxSwitchElement } from './ux-switch';

export function configure(config: FrameworkConfiguration) {
  config.container.get(AureliaUX).registerUxElementConfig(uxSwitchConfig);
  config.globalResources(PLATFORM.moduleName('./ux-switch'));
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
