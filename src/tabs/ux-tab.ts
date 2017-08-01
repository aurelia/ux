import {
  inject, customElement, bindable, bindingMode, processAttributes,
  ViewResources, View
} from 'aurelia-framework';
import { DOM } from 'aurelia-pal';
import { StyleEngine } from '../styles/style-engine';
import { Themable } from '../styles/themable';
import { processDesignAttributes } from '../designs/design-attributes';

@inject(DOM.Element, ViewResources, StyleEngine)
@customElement('ux-tab')
@processAttributes(processDesignAttributes)
export class UxTab implements Themable {

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public selected = false;
  @bindable public disabled = false;
  @bindable public text: string|null = null;
  @bindable public icon: string|null = null;
  @bindable public theme = null;

  public view: View;

  constructor(
    public readonly element: Element,
    public readonly resources: ViewResources,
    private readonly styleEngine: StyleEngine
  ) {}

  public created(_: any, myView: View) {
    this.view = myView;
  }

  public bind() {
    if (this.theme) {
      this.styleEngine.applyTheme(this, this.theme);
    }
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(this, newValue);
  }
}
