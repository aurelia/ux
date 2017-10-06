import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from 'aurelia-ux';
import { UxChipTheme } from './ux-chip-theme';

@inject(Element, StyleEngine)
@customElement('ux-chip')

export class UxChip implements UxComponent {
  @bindable public theme: UxChipTheme;
  @bindable public type: any;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: any = undefined;

  constructor(
    private element: HTMLInputElement,
    private styleEngine: StyleEngine) {
    styleEngine.ensureDefaultTheme(new UxChipTheme());
  }

  public bind() {
    this.themeChanged(this.theme);
  }

  public themeChanged(newValue: UxChipTheme) {
    this.styleEngine.applyTheme(this.element, newValue);
  }

  public closeChip() {
    const closeEvent = DOM.createCustomEvent('close', { bubbles: false });

    this.element.dispatchEvent(closeEvent);
  }
}
