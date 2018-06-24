import { AureliaUX } from '@aurelia-ux/core';
import { CheckedObserver, EventSubscriber } from 'aurelia-binding';
import { bindingMode, FrameworkConfiguration, ObserverLocator } from 'aurelia-framework';
import { UxCheckbox } from './ux-checkbox';

export { UxCheckbox, UxCheckboxElement } from './ux-checkbox';
export { UxCheckboxTheme } from './ux-checkbox-theme';

export function configure(config: FrameworkConfiguration) {
  (config.container.get(AureliaUX) as AureliaUX).registerUxElementConfig(uxCheckBoxConfig);
  config.globalResources(UxCheckbox);
}

const uxCheckBoxConfig = {
  tagName: 'ux-checkbox',
  properties: {
    checked: {
      defaultBindingMode: bindingMode.twoWay,
      getObserver(element: Element, _: string, observerLocator: ObserverLocator) {
        return new CheckedObserver(element, new EventSubscriber(['change']), observerLocator);
      }
    }
  }
};
