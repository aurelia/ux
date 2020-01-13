import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { UxInputInfoTheme } from './ux-input-info-theme';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { computedFrom } from 'aurelia-binding';

@inject(Element, StyleEngine)
@customElement('ux-input-info')
export class UxInputInfo implements UxComponent {
  @bindable public target: { element: Element, value: string, maxlength: number };
  @bindable public uxInputCounter = null;
  @bindable public theme: UxInputInfoTheme;

  public inputElementModel: any;

  constructor(private element: HTMLElement, public styleEngine: StyleEngine) { }

  public bind() {
    if (this.target === undefined) {
      this.findAndSetTarget(this.element);
    }

    this.themeChanged(this.theme);
  }

  public themeChanged(newValue: UxInputInfoTheme) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'input-info';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  private findAndSetTarget(element: any) {
    const inputElement = element.previousElementSibling;

    if (!inputElement) {
      return;
    }

    if (inputElement.nodeName === 'UX-INPUT' || inputElement.nodeName === 'UX-TEXTAREA') {
      this.target = inputElement.au.controller.viewModel;
    }
  }

  @computedFrom('target.maxlength')
  public get maxLength(): number {
    const target = this.target;
    if (target.element.tagName === 'UX-INPUT' || target.element.tagName === 'UX-TEXTAREA') {
      return target.maxlength;
    }
    return 0;
  }

  @computedFrom('target.value')
  public get length(): number {
    const target = this.target;
    if (target.element.tagName === 'UX-INPUT' || target.element.tagName === 'UX-TEXTAREA') {
      return target.value.length;
    }
    return 0;
  }
}
