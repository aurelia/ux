import { customElement, bindable, ViewResources, View, processAttributes } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
import { Themable } from '../styles/themable';
import { processDesignAttributes } from '../designs/design-attributes';

@inject(Element, ViewResources, StyleEngine)
@customElement('ux-input')
@processAttributes(processDesignAttributes)

export class UxInput implements Themable {
  @bindable public type = 'text';
  @bindable public theme = null;
  @bindable public inputCounter = null;
  @bindable public disabled: any = false;
  @bindable public minlength: any = null;
  @bindable public maxlength: any = null;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public placeholder: any = null;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: any = null;

  public view: View;
  private textbox: HTMLInputElement;

  constructor(private element: HTMLInputElement, public resources: ViewResources, private styleEngine: StyleEngine) { }

  public created(_: any, myView: View) {
    this.view = myView;
  }

  public bind() {
    if (this.theme) {
      this.styleEngine.applyTheme(this, this.theme);
    }

    if (this.minlength) {
      this.textbox.setAttribute('minlength', this.minlength);
    }

    if (this.maxlength) {
      this.textbox.setAttribute('maxlength', this.maxlength);
    }

    if (this.disabled || this.disabled === '') {
      this.textbox.setAttribute('disabled', '');
    }
  }

  public attached() {
    let blurEvent = DOM.createCustomEvent('blur', { bubbles: true });

    this.textbox.addEventListener('blur', () => this.element.dispatchEvent(blurEvent));
  }

  public detached() {
    let blurEvent = DOM.createCustomEvent('blur', { bubbles: true });

    this.textbox.removeEventListener('blur', () => this.element.dispatchEvent(blurEvent));
  }

  public unbind() { }

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
