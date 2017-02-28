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
  @bindable public autofocus = null;
  @bindable public disabled: any = false;
  @bindable public inputCounter = null;
  @bindable public maxlength: any = null;
  @bindable public minlength: any = null;
  @bindable public readonly: any = false;
  @bindable public required: any = false;
  @bindable public theme = null;
  @bindable public type = 'text';

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public placeholder: any = null;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public step: any = null;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: any = undefined;

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

    if (this.autofocus || this.autofocus === '') {
      setTimeout(() => {
        this.textbox.focus();
      }, 0);
    }

    if (this.required) {
      this.textbox.setAttribute('required', '');
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

    if (this.readonly || this.readonly === '') {
      this.textbox.setAttribute('readonly', '');
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

  public disabledChanged(newValue: any) {
    if (newValue === true || newValue === '') {
      this.textbox.setAttribute('disabled', 'true');
    } else {
      this.textbox.removeAttribute('disabled');
    }
  }

  public readonlyChanged(newValue: any) {
    if (newValue === true || newValue === '') {
      this.textbox.setAttribute('readonly', 'true');
    } else {
      this.textbox.removeAttribute('readonly');
    }
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(this, newValue);
  }
}