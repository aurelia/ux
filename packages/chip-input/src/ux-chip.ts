import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxChipTheme } from './ux-chip-theme';

@inject(Element, StyleEngine)
@customElement('ux-chip')

export class UxChip implements UxComponent {
  @bindable public theme: UxChipTheme;
  @bindable public type: any;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: any = undefined;

  constructor(
    private element: HTMLInputElement,
    private styleEngine: StyleEngine) { }

  public bind() {
    this.themeChanged(this.theme);

    if (this.element.hasAttribute('deletable')) {
      this.element.removeAttribute('deletable');
      this.element.classList.add('ux-chip--deletable');
    }
  }

  public themeChanged(newValue: UxChipTheme) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'chip';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public closeChip() {
    const closeEvent = DOM.createCustomEvent('close', { bubbles: false });

    this.element.dispatchEvent(closeEvent);
  }
}
