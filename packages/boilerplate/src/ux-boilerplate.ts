import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxBoilerplateTheme } from './ux-boilerplate-theme';

const theme = new UxBoilerplateTheme();

@inject(Element, StyleEngine)
@customElement('ux-button')
export class UxButton implements UxComponent {
  @bindable public theme: UxBoilerplateTheme;

  constructor(
    public element: HTMLElement,
    private styleEngine: StyleEngine) {
      styleEngine.ensureDefaultTheme(theme);
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
