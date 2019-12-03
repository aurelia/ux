import { FrameworkConfiguration, bindingMode, PLATFORM } from 'aurelia-framework';
import { ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';

export { UxTextAreaTheme } from './ux-textarea-theme';
export { UxTextArea, UxTextAreaElement } from './ux-textarea';

export function configure(config: FrameworkConfiguration) {
  config.container.get(AureliaUX).registerUxElementConfig(uxTextAreaConfig);
  config.globalResources(PLATFORM.moduleName('./ux-textarea'));
}

const uxTextAreaConfig = {
  tagName: 'ux-textarea',
  properties: {
    value: {
      defaultBindingMode: bindingMode.twoWay,
      getObserver(element: Element) {
        return new ValueAttributeObserver(element, 'value', new EventSubscriber(['change']));
      }
    }
  }
};
