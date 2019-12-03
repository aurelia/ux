import { FrameworkConfiguration, bindingMode, ObserverLocator, PLATFORM } from 'aurelia-framework';
import { CheckedObserver, EventSubscriber } from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';

export { UxCheckboxTheme } from './ux-checkbox-theme';
export { UxCheckbox, UxCheckboxElement } from './ux-checkbox';

export function configure(config: FrameworkConfiguration) {
  config.container.get(AureliaUX).registerUxElementConfig(uxCheckBoxConfig);
  config.globalResources(PLATFORM.moduleName('./ux-checkbox'));
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
