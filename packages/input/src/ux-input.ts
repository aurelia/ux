import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxInputTheme } from './ux-input-theme';

const theme = new UxInputTheme();

@inject(Element, StyleEngine)
@customElement('ux-input')
export class UxInput implements UxComponent {
  @bindable public autofocus = null;
  @bindable public disabled: any = false;
  @bindable public maxlength: number;
  @bindable public minlength: number;
  @bindable public min: number;
  @bindable public max: number;
  @bindable public readonly: any = false;
  @bindable public theme: UxInputTheme;
  @bindable public type: any;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: any = undefined;

  public textbox: HTMLInputElement;

  constructor(private element: HTMLInputElement, public styleEngine: StyleEngine) {
    styleEngine.ensureDefaultTheme(theme);
  }

  public bind() {

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

    if ([
      'text',
      'password',
      'number',
      'email',
      'url',
      'tel',
      'search'
    ].includes(this.type)) {
      this.textbox.setAttribute('type', this.type);
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

    this.themeChanged(this.theme);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'input';
    }

    this.styleEngine.applyTheme(newValue, this.element);
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

  public onFieldBlur() {
    this.element.classList.remove('focused');
    this.element.dispatchEvent(DOM.createCustomEvent('blur', { bubbles: true }));
  }

  public onFieldFocus() {
    this.element.classList.add('focused');
    this.element.dispatchEvent(DOM.createCustomEvent('focus', { bubbles: true }));
  }
}
