import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from 'aurelia-ux';
import { UxTagTheme } from './ux-tag-theme';

@inject(Element, StyleEngine)
@customElement('ux-tag')

export class UxTag implements UxComponent {
  @bindable public theme: UxTagTheme;
  @bindable public type: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: any = undefined;

  constructor(
    private element: HTMLInputElement,
    private styleEngine: StyleEngine) {
    styleEngine.ensureDefaultTheme(new UxTagTheme());
  }

  public bind() {
    if (this.theme) {
      this.styleEngine.applyTheme(this.theme, this.element);
    }
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(newValue, this.element);
  }

  public closeTag() {
    const closeEvent = DOM.createCustomEvent('close', { bubbles: false });

    this.element.dispatchEvent(closeEvent);
  }
}
