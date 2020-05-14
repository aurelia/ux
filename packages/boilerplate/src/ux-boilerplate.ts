import { customElement, bindable, useView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxBoilerplateTheme } from './ux-boilerplate-theme';
import { PLATFORM } from 'aurelia-framework';

@inject(Element, StyleEngine)
@customElement('ux-button')
@useView(PLATFORM.moduleName('./ux-boilerplate.html'))
export class UxButton implements UxComponent {
  @bindable public theme: UxBoilerplateTheme;

  constructor(
    public element: HTMLElement,
    private styleEngine: StyleEngine) { }

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
