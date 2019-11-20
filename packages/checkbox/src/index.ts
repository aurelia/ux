/// <reference path="html.d.ts" />
import { FrameworkConfiguration, bindingMode, ObserverLocator } from 'aurelia-framework';
import { CheckedObserver, EventSubscriber } from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';
import { UxCheckbox } from './ux-checkbox';

export { UxCheckboxTheme } from './ux-checkbox-theme';
export { UxCheckbox, UxCheckboxElement } from './ux-checkbox';

export function configure(config: FrameworkConfiguration) {
  config.container.get(AureliaUX).registerUxElementConfig(uxCheckBoxConfig);
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
