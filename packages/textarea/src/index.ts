import { FrameworkConfiguration, PLATFORM, bindingMode } from 'aurelia-framework';
import * as AuBinding from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';

export { UxTextAreaTheme } from './ux-textarea-theme';
export { UxTextArea, UxTextAreaElement } from './ux-textarea';

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
        return new (AuBinding as any).ValueAttributeObserver(element, 'value', uxTextareaChangeHandler);
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
