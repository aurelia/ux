import { FrameworkConfiguration, bindingMode, DOM } from 'aurelia-framework';
import { ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';
import { UxTextArea } from './ux-textarea';
import css from './ux-textarea.css';

export { UxTextAreaTheme } from './ux-textarea-theme';
export { UxTextArea, UxTextAreaElement } from './ux-textarea';

export function configure(config: FrameworkConfiguration) {
  DOM.injectStyles(css, undefined, undefined, 'ux-textarea-css');
  (config.container.get(AureliaUX) as AureliaUX).registerUxElementConfig(uxTextAreaConfig);
  config.globalResources(UxTextArea);
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
