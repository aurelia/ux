import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { UxComponent, StyleEngine, UxTheme } from '@aurelia-ux/core';
import { UxListTheme } from './ux-list-theme';

const theme = new UxListTheme();

@inject(Element, StyleEngine)
@customElement('ux-list')

export class UxList implements UxComponent {
  @bindable public theme: UxListTheme;

  constructor(
    public element: HTMLElement,
    private styleEngine: StyleEngine) {
      styleEngine.ensureDefaultTheme(theme);
    }

  public bind() {
    if (this.theme != null) {
      this.themeChanged(this.theme);
    }
  }

  public themeChanged(newTheme: UxTheme) {
    this.styleEngine.applyTheme(newTheme, this.element);
  }
}
