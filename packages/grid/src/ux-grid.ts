import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent, Size } from '@aurelia-ux/core';
import { UxGridTheme } from './ux-grid-theme';
import { observable } from 'aurelia-binding';

@inject(Element, StyleEngine)
@customElement('ux-grid')
export class UxGrid implements UxComponent {
  @bindable public theme: UxGridTheme;
  @bindable public columns: null | number;

  @observable private size: Size = { width: 0, height: 0};
  public elSize: string = 'ux-grid--xs ux-grid--current-xs';

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

  public sizeChanged() {
    this.setElSize(this.size.width);
  }

  public attached() {
    this.setElSize(this.element.offsetWidth);
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

  public setElSize(w: number) {
    // const w = this.element.offsetWidth;
    let elSize = '';
    if (w <= 480) {
      elSize += ' ux-grid--xs ux-grid--current-xs';
    }
    if (w > 480) {
      elSize += ' ux-grid--sm';
      if (w <= 960) {
        elSize += ' ux-grid--current-sm';
      }
    }
    if (w > 960) {
      elSize += ' ux-grid--md';
      if (w <= 1280) {
        elSize += ' ux-grid--current-md';
      }
    }
    if (w > 1280) {
      elSize += ' ux-grid--lg';
      if (w <= 1925) {
        elSize += ' ux-grid--current-lg';
      }
    }
    if (w > 1925) {
      elSize += ' ux-grid--xl ux-grid--current-xl';
    }
    this.elSize = elSize;
  }
}
