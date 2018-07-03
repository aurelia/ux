import { FrameworkConfiguration, bindingMode, DOM } from 'aurelia-framework';
import { ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';
import css from './ux-input.css';
import { UxInput } from './ux-input';

export { UxInputTheme } from './ux-input-theme';
export { UxInput, UxInputElement } from './ux-input';

export function configure(config: FrameworkConfiguration) {
  DOM.injectStyles(css, undefined, undefined, 'ux-input-css');
  config.container.get(AureliaUX).registerUxElementConfig(uxInputConfig);
  config.globalResources(UxInput);
}

const uxInputConfig = {
  tagName: 'ux-input',
  properties: {
    value: {
      defaultBindingMode: bindingMode.twoWay,
      getObserver(element: Element) {
        return new ValueAttributeObserver(element, 'value', new EventSubscriber(['change']));
      }
    }
  }
};
