import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxTagTheme } from './ux-tag-theme';

@inject(Element, StyleEngine)
@customElement('ux-tag')

export class UxTag implements UxComponent {
  @bindable public theme: UxTagTheme;
  @bindable public type: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: any = undefined;

  constructor(
    private element: HTMLInputElement,
    private styleEngine: StyleEngine) { }

  public bind() {
    this.themeChanged(this.theme);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'tag';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public closeTag() {
    const closeEvent = DOM.createCustomEvent('close', { bubbles: false });

    this.element.dispatchEvent(closeEvent);
  }
}
