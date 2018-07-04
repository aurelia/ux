import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxChipTheme } from './ux-chip-theme';
import UX_CHIP_VIEW from './ux-chip.html';

@inject(Element, StyleEngine)
@customElement('ux-chip')

export class UxChip implements UxComponent {

  public static readonly $view = UX_CHIP_VIEW;

  @bindable public theme: UxChipTheme;
  @bindable public type: any;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: any = undefined;

  constructor(
    private element: HTMLInputElement,
    private styleEngine: StyleEngine) { }

  public bind() {
    this.themeChanged(this.theme);
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
