import { FrameworkConfiguration, bindingMode, ObserverLocator, DOM } from 'aurelia-framework';
import { CheckedObserver, EventSubscriber } from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';
import { UxRadio } from './ux-radio';
import css from './ux-radio.css';

export { UxRadioTheme } from './ux-radio-theme';
export { UxRadio, UxRadioElement } from './ux-radio';

export function configure(config: FrameworkConfiguration) {
  DOM.injectStyles(css, undefined, undefined, 'ux-radio-css');
  (config.container.get(AureliaUX) as AureliaUX).registerUxElementConfig(uxRadioConfig);
  config.globalResources(UxRadio);
}

const uxRadioConfig = {
  tagName: 'ux-radio',
  properties: {
    checked: {
      defaultBindingMode: bindingMode.twoWay,
      getObserver(element: Element, _: string, observerLocator: ObserverLocator) {
        return new CheckedObserver(element, new EventSubscriber(['change']), observerLocator);
      }
    }
  }
};
