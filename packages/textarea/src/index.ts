import { FrameworkConfiguration, PLATFORM, bindingMode, ValueAttributeObserver } from 'aurelia-framework';
import { AureliaUX } from '@aurelia-ux/core';

export { UxTextareaTheme } from './ux-textarea-theme';

export function configure(config: FrameworkConfiguration) {
  config.container.get(AureliaUX).registerUxElementConfig(uxTextAreaConfig);
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/textarea/ux-textarea')
  ]);
}

const uxTextAreaConfig = {
  tagName: 'ux-textarea',
  properties: {
    value: {
      defaultBindingMode: bindingMode.twoWay,
      getObserver(element: Element) {
        return new ValueAttributeObserver(element, 'value', uxTextareaChangeHandler);
      }
    }
  }
};

const uxTextareaChangeHandler = {
  subscribe(target: Element, callbackOrListener: EventListenerOrEventListenerObject) {
    target.addEventListener('change', callbackOrListener, false);

    return function() {
      target.removeEventListener('change', callbackOrListener, false);
    };
  }
};
