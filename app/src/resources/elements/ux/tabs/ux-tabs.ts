import { inject } from 'aurelia-dependency-injection';
import { bindable, customElement } from 'aurelia-templating';
import { UxComponent, StyleEngine } from '@aurelia-ux/core';
import { UxTabsTheme } from './ux-tabs-theme';

@inject(Element, StyleEngine)
@customElement('ux-tabs')
export class UxTooltip implements UxComponent {
  @bindable public for: HTMLElement;
  @bindable public theme: UxTabsTheme;

  constructor(public element: HTMLElement, private styleEngine: StyleEngine) { }

  public bind() {
    this.themeChanged(this.theme);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'alert';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }
}
