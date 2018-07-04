import { customElement, bindable, inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxGridTheme } from './ux-grid-theme';
import UX_GRID_VIEW from './ux-grid.html';

@inject(Element, StyleEngine)
@customElement('ux-grid')
@inlineView(UX_GRID_VIEW)
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
