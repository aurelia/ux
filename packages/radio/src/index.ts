import { FrameworkConfiguration, PLATFORM, bindingMode, ObserverLocator, CheckedObserver } from 'aurelia-framework';
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
        return new CheckedObserver(element, uxRadioChangeHandler, observerLocator);
      }
    }
  }
};

const uxRadioChangeHandler = {
  subscribe(target: Element, callbackOrListener: EventListenerOrEventListenerObject) {
    target.addEventListener('change', callbackOrListener, false);

    return function() {
      target.removeEventListener('change', callbackOrListener, false);
    };
  }
};
