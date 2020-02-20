import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxChipListTheme } from './ux-chip-list-theme';

@inject(Element, StyleEngine)
@customElement('ux-chip-list')
export class UxChipList implements UxComponent {
  @bindable public theme: UxChipListTheme;
  @bindable public type: 'inline' | 'scroll' | 'stack' = 'inline';

  constructor(private element: HTMLElement, private styleEngine: StyleEngine) { }

  public bind() {
    this.themeChanged(this.theme);
  }

  public themeChanged(newValue: UxChipListTheme) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'chip-list';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }
}
