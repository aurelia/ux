import { customElement, bindable, inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { UxComponent, StyleEngine } from '@aurelia-ux/core';
import { UxListTheme } from './ux-list-theme';
import UX_LIST_VIEW from './ux-list.html';

@inject(Element, StyleEngine)
@customElement('ux-list')
@inlineView(UX_LIST_VIEW)
export class UxList implements UxComponent {
  @bindable public theme: UxListTheme;

  constructor(
    public element: HTMLElement,
    private styleEngine: StyleEngine) { }

  public bind() {
    if (this.theme != null) {
      this.themeChanged(this.theme);
    }
  }

  public themeChanged(newValue: UxListTheme) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'list';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }
}
