import { inject } from 'aurelia-dependency-injection';
import { bindable, customElement } from 'aurelia-templating';
import { UxComponent, StyleEngine } from '@aurelia-ux/core';
import { UxCardTheme } from './ux-card-theme';

@inject(Element, StyleEngine)
@customElement('ux-card')
export class UxCard implements UxComponent {
  @bindable public theme: UxCardTheme;

  constructor(public element: HTMLElement, private styleEngine: StyleEngine) {
    styleEngine.ensureDefaultTheme(new UxCardTheme());
  }

  public bind() {
    if (this.theme != null) {
      this.themeChanged(this.theme);
    }
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(newValue, this.element);
  }
}
