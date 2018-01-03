import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxGridTheme } from './ux-grid-theme';

const gridTheme = new UxGridTheme();

@inject(Element, StyleEngine)
@customElement('ux-button')
export class UxButton implements UxComponent {
  @bindable public theme: UxGridTheme;

  constructor(
    public element: HTMLElement,
    private styleEngine: StyleEngine) {
      styleEngine.ensureDefaultTheme(gridTheme);
    }

  public bind() {
    this.themeChanged(this.theme);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'boilerplate';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }
}
