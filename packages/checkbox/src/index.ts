import { AureliaUX } from '@aurelia-ux/core';
import { CheckedObserver, EventSubscriber } from 'aurelia-binding';
import { bindingMode, FrameworkConfiguration, ObserverLocator, DOM } from 'aurelia-framework';
import { UxCheckbox } from './ux-checkbox';
import css from './ux-checkbox.css';

export { UxCheckbox, UxCheckboxElement } from './ux-checkbox';
export { UxCheckboxTheme } from './ux-checkbox-theme';

export function configure(config: FrameworkConfiguration) {
  DOM.injectStyles(css, undefined, undefined, 'ux-checkbox-css');
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
