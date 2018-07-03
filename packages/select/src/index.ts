import {
  FrameworkConfiguration,
  bindingMode,
  DOM,
} from 'aurelia-framework';

import { ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';

import { AureliaUX } from '@aurelia-ux/core';
import { UxSelect } from './ux-select';
import { UxOptGroup } from './ux-optgroup';
import { UxOption } from './ux-option';
import css from './ux-select.css';

export { UxOption, UxOptionElement } from './ux-option';
export { UxOptGroup, UxOptGroupElement } from './ux-optgroup';
export { UxSelect, UxSelectElement } from './ux-select';
export { UxSelectTheme } from './ux-select-theme';

export function configure(config: FrameworkConfiguration) {
  DOM.injectStyles(css, undefined, undefined, 'ux-select-css');
  config.container.get(AureliaUX).registerUxElementConfig(uxSelectConfig);
  config.globalResources([
    UxSelect,
    UxOptGroup,
    UxOption,
  ]);
}

const uxSelectConfig = {
  tagName: 'ux-select',
  properties: {
    value: {
      defaultBindingMode: bindingMode.twoWay,
      getObserver(element: Element, _: string) {
        return new ValueAttributeObserver(element, 'value', new EventSubscriber(['change']));
      }
    }
  }
};
