import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { UxInputInfoTheme } from './ux-input-info-theme';
import { StyleEngine, UxComponent } from 'aurelia-ux';

const theme = new UxInputInfoTheme();

@inject(Element, StyleEngine)
@customElement('ux-input-info')
export class UxInputInfo implements UxComponent {
  @bindable public target: Element;
  @bindable public uxInputCounter = null;
  @bindable public theme: UxInputInfoTheme;

  public inputElementModel: any;

  constructor(private element: HTMLElement, public styleEngine: StyleEngine) {
    styleEngine.ensureDefaultTheme(theme);
  }

  public bind() {
    if (this.target === undefined) {
      this.findAndSetTarget(this.element);
    }

    this.themeChanged(this.theme);
  }

  public themeChanged(theme: UxInputInfoTheme) {
    this.styleEngine.applyTheme(theme, this.element );
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
