import { inject } from 'aurelia-dependency-injection';
import { bindable, customElement, inlineView } from 'aurelia-templating';
import { UxComponent, StyleEngine } from '@aurelia-ux/core';
import { UxCardTheme } from './ux-card-theme';
import UX_CARD_VIEW from './ux-card.html';

@inject(Element, StyleEngine)
@customElement('ux-card')
@inlineView(UX_CARD_VIEW)
export class UxCard implements UxComponent {
  @bindable public theme: UxCardTheme;

  constructor(public element: HTMLElement, private styleEngine: StyleEngine) { }

  public bind() {
    if (this.theme != null) {
      this.themeChanged(this.theme);
    }
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(newValue, this.element);
  }
}
