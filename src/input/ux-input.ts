import { customElement, ViewResources, View, processAttributes } from 'aurelia-templating';
import { bindable, bindingMode } from 'aurelia-framework';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
import { Themable } from '../styles/themable';
import { processDesignAttributes } from '../designs/design-attributes';

@inject(ViewResources, StyleEngine)
@customElement('ux-input')
@processAttributes(processDesignAttributes)

export class UxInput implements Themable {

  @bindable public type = 'text';
  @bindable public theme = null;
  @bindable public inputCounter = null;
  @bindable public disabled: any = false;
  @bindable public minlength: any = null;
  @bindable public maxlength: any = null;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: any = null;

  public view: View;
  private textbox: HTMLInputElement;

  constructor(public resources: ViewResources, private styleEngine: StyleEngine) { }

  public created(_: any, myView: View) {
    this.view = myView;
  }

  public bind() {
    if (this.theme) {
      this.styleEngine.applyTheme(this, this.theme);
    }

    // Input textbox attributes: disabled, minlength, and maxlength 
    // added here. When bound to null the binding defaults to 0 which 
    // prevents the textbox from accepting any input. The disabled attribute
    // looks for explicitly false to decide whether to add the disabled attribute
    // to the base input control or not.
    if (this.minlength) {
      this.textbox.setAttribute('minlength', this.minlength);
    }

    if (this.maxlength) {
      this.textbox.setAttribute('maxlength', this.maxlength);
    }

    if ( this.disabled || this.disabled === '' ) {
      this.textbox.setAttribute('disabled', '');
    }
  }

  public disabledChanged(newValue: any) {
    if (newValue === true || newValue === '') {
      this.textbox.setAttribute('disabled', 'true');
    } else {
      this.textbox.removeAttribute('disabled');
    }
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(this, newValue);
  }
}
