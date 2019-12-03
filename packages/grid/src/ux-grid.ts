import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxGridTheme } from './ux-grid-theme';

@inject(Element, StyleEngine)
@customElement('ux-grid')
export class UxGrid implements UxComponent {
  @bindable public theme: UxGridTheme;
  @bindable public columns: null | number;

  constructor(
    public element: HTMLElement,
    private styleEngine: StyleEngine) { }

  public bind() {
    this.themeChanged(this.theme);

    if (this.columns != null) {
      this.columnsChanged(this.columns);
    }

    this.processAttributes();
  }

  public processAttributes() {
    const alignAttributes = [
      'align-cells-top',
      'align-cells-middle',
      'align-cells-bottom',
      'fixed',
      'remove-padding'
    ];

    for (const attribute of alignAttributes) {
      if (this.element.hasAttribute(attribute)) {
        this.element.removeAttribute(attribute);
        this.element.classList.add(`ux-grid--${attribute}`);
      }
    }
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'grid';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public columnsChanged(newValue: null | number) {
    if (newValue != null) {
      this.element.style.setProperty('grid-template-columns', `repeat(${newValue}, 1fr)`);
    }
  }
}
