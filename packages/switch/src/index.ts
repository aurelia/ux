import { FrameworkConfiguration, bindingMode, ObserverLocator, DOM } from 'aurelia-framework';
import { CheckedObserver, EventSubscriber } from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';
import { UxSwitch } from './ux-switch';
import css from './ux-switch.css';

export { UxSwitchTheme } from './ux-switch-theme';
export { UxSwitch, UxSwitchElement } from './ux-switch';

export function configure(config: FrameworkConfiguration) {
  DOM.injectStyles(css, undefined, undefined, 'ux-switch-css');
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
