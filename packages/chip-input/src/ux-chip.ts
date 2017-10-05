import { customElement, bindable, ViewResources, View, processAttributes } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from 'aurelia-ux';
import { Themable } from 'aurelia-ux';
import { processDesignAttributes } from 'aurelia-ux';
import { UxChipTheme } from './ux-chip-theme';

@inject(Element, ViewResources, StyleEngine)
@customElement('ux-chip')
@processAttributes(processDesignAttributes)

export class UxChip implements Themable {
  @bindable public theme: UxChipTheme;
  @bindable public type: any;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: any = undefined;

  public view: View;

  constructor(
    private element: HTMLInputElement,
    public resources: ViewResources,
    private styleEngine: StyleEngine) { }

  public created(_: any, myView: View) {
    this.view = myView;
  }

  public bind() {
    this.themeChanged(this.theme);
  }

  public themeChanged(newValue: UxChipTheme) {
    if (!newValue) {
      newValue = {
        background: '#e0e0e0',
        foreground: '#757575'
      };
    }

    this.styleEngine.applyTheme(this, newValue);
  }

  public closeChip() {
    const closeEvent = DOM.createCustomEvent('close', { bubbles: false });

    this.element.dispatchEvent(closeEvent);
  }
}
