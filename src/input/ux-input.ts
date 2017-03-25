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
  @bindable public maxlength: number;
  @bindable public minlength: number;
  @bindable public min: number;
  @bindable public max: number;
  @bindable public readonly: any = false;
  @bindable public theme = null;
  @bindable public type: any;

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

    if (this.element.hasAttribute('required')) {
      this.textbox.setAttribute('required', '');
      this.element.removeAttribute('required');
    }

    if (this.element.hasAttribute('placeholder')) {
      const attributeValue = this.element.getAttribute('placeholder');

      if (attributeValue) {
        this.textbox.setAttribute('placeholder', attributeValue);
        this.element.removeAttribute('placeholder');
      }
    }

    if (this.element.hasAttribute('step')) {
      const attributeValue = this.element.getAttribute('step');

      if (attributeValue) {
        this.textbox.setAttribute('step', attributeValue);
        this.element.removeAttribute('step');
      }
    }

    if (this.type) {
      if (this.type !== 'text' && this.type !== 'password' && this.type !== 'number') {
        this.type = 'text';
      }
    }

    if (this.min) {
      this.textbox.setAttribute('min', this.min.toString());
    }

    if (this.max) {
      this.textbox.setAttribute('max', this.max.toString());
    }

    if (this.minlength) {
      this.textbox.setAttribute('minlength', this.minlength.toString());
    }

    if (this.maxlength) {
      this.textbox.setAttribute('maxlength', this.maxlength.toString());
    }

    if (this.disabled || this.disabled === '') {
      this.textbox.setAttribute('disabled', '');
    }

    if (this.readonly || this.readonly === '') {
      this.textbox.setAttribute('readonly', '');
    }
  }

  public attached() {
    const blurEvent = DOM.createCustomEvent('blur', { bubbles: true });

    this.textbox.addEventListener('focus', () => {
      this.element.classList.add('focused');
    });

    this.textbox.addEventListener('blur', () => {
      this.element.classList.remove('focused');
      this.element.dispatchEvent(blurEvent);
    });
  }

  public detached() {
    const blurEvent = DOM.createCustomEvent('blur', { bubbles: true });

    this.textbox.removeEventListener('focus', () => {
      this.element.classList.add('focused');
    });

    this.textbox.removeEventListener('blur', () => {
      this.element.classList.remove('focused');
      this.element.dispatchEvent(blurEvent);
    });
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

  public typeChanged(newValue: any) {
    if (newValue !== 'text' && newValue !== 'password' && newValue !== 'number') {
      this.type = 'text';
    }
  }

  public valueChanged(newValue: any) {
    if (this.type === 'number' && !isNaN(newValue) && newValue !== '') {
      if (this.min && newValue < this.min) {
        this.value = this.min;
      }

      if (this.max && newValue > this.max) {
        this.value = this.max;
      }

      if (isNaN(newValue)) {
        this.value = '';
      }
    }

  }
}
