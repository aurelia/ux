import { FrameworkConfiguration, PLATFORM, bindingMode, ObserverLocator } from 'aurelia-framework';
import { CheckedObserver, EventSubscriber } from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';

export { UxRadioTheme } from './ux-radio-theme';
export { UxRadio, UxRadioElement } from './ux-radio';

export function configure(config: FrameworkConfiguration) {
  config.container.get(AureliaUX).registerUxElementConfig(uxRadioConfig);
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/radio/ux-radio')
  ]);
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
