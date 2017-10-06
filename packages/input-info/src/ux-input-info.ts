import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { UxInputInfoTheme } from './ux-input-info-theme';
import { StyleEngine } from 'aurelia-ux';

@inject(Element, StyleEngine)
@customElement('ux-input-info')
export class UxInputInfo {
  @bindable public target: Element;
  @bindable public uxInputCounter = null;
  @bindable public theme: UxInputInfoTheme;

  public inputElementModel: any;

  constructor(private element: HTMLElement, public styleEngine: StyleEngine) {
    styleEngine.ensureDefaultTheme(new UxInputInfoTheme());
  }

  public bind() {
    if (this.target === undefined) {
      this.findAndSetTarget(this.element);
    }

    this.themeChanged(this.theme);
  }

  public themeChanged(theme: UxInputInfoTheme) {
    this.styleEngine.applyTheme(this.element, theme);
  }

  private findAndSetTarget(element: any) {
    const inputElement = element.previousElementSibling;

    if (!inputElement) {
      return;
    }

    if (inputElement.nodeName === 'UX-INPUT' || inputElement.nodeName === 'UX-TEXTAREA') {
      this.target = inputElement.au.controller.viewModel;
    }
  }
}
