import {customElement, ViewResources, View, processAttributes} from 'aurelia-templating';
import { bindable, bindingMode } from 'aurelia-framework';
import {inject} from 'aurelia-dependency-injection';
import {StyleEngine} from '../styles/style-engine';
import {Themable} from '../styles/themable';
import {processDesignAttributes} from '../designs/design-attributes';

@inject(ViewResources, StyleEngine)
@customElement('ux-input')
@processAttributes(processDesignAttributes)

export class UxInput implements Themable {

  @bindable public type = null;
  @bindable public disabled = false;
  @bindable public theme = null;
  @bindable({ defaultBindingMode: bindingMode.twoWay })  public value = null;

  public view: View;
  // private textbox: HTMLInputElement;

  constructor(public resources: ViewResources, private styleEngine: StyleEngine) {}

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
