import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent, defineValueProperty } from '@aurelia-ux/core';
import { UxInputTheme } from './ux-input-theme';

const theme = new UxInputTheme();

@inject(Element, StyleEngine)
@customElement('ux-input')
export class UxInput implements UxComponent {
  private ignoreRawChanges: boolean;

  @bindable public autofocus = null;
  @bindable public disabled: any = false;
  @bindable public maxlength: number;
  @bindable public minlength: number;
  @bindable public min: number;
  @bindable public max: number;
  @bindable public readonly: any = false;
  @bindable public theme: UxInputTheme;
  @bindable public type: any;

  @observable
  public rawValue: string = '';

  @observable
  public focused: boolean = false;

  public value: any = undefined;
  public textbox: HTMLInputElement;

  constructor(private element: UxInputElement, public styleEngine: StyleEngine) {
    defineValueProperty(element);
    styleEngine.ensureDefaultTheme(theme);
  }

  public bind() {
    const element = this.element;
    const textbox = this.textbox;

    textbox.addEventListener('change', stopEvent);
    textbox.addEventListener('input', stopEvent);

    if (this.autofocus || this.autofocus === '') {
      this.focused = true;
    }

    if (element.hasAttribute('placeholder')) {
      const attributeValue = element.getAttribute('placeholder');

      if (attributeValue) {
        textbox.setAttribute('placeholder', attributeValue);
        element.removeAttribute('placeholder');
      }
    }

    if (element.hasAttribute('step')) {
      const attributeValue = element.getAttribute('step');

      if (attributeValue) {
        textbox.setAttribute('step', attributeValue);
        element.removeAttribute('step');
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
      textbox.setAttribute('type', this.type);
    }

    if (this.min) {
      textbox.setAttribute('min', this.min.toString());
    }

    if (this.max) {
      textbox.setAttribute('max', this.max.toString());
    }

    if (this.minlength) {
      textbox.setAttribute('minlength', this.minlength.toString());
    }

    if (this.maxlength) {
      textbox.setAttribute('maxlength', this.maxlength.toString());
    }

    this.themeChanged(this.theme);
  }

  public unbind() {
    this.textbox.removeEventListener('change', stopEvent);
    this.textbox.removeEventListener('input', stopEvent);
  }

  public getValue() {
    return this.value;
  }

  public setValue(value: any) {
    const oldValue = this.value;
    const newValue = this.processRawValue(value);

    if (oldValue !== newValue) {
      this.value = newValue;
      this.ignoreRawChanges = true;
      this.rawValue = newValue === null || newValue === undefined ? '' : newValue.toString();
      this.ignoreRawChanges = false;
      this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
    }
  }

  private processRawValue(rawValue: string): any {
    let newValue: any = rawValue;
    if (this.type === 'number') {
      newValue = rawValue === '' ? NaN : Number(rawValue);
      if (isNaN(newValue)) {
        newValue = null;
      } else {
        if (this.min !== undefined && this.min > newValue) {
          newValue = this.min;
        }
        if (this.max !== undefined && newValue > this.max) {
          newValue = this.max;
        }
      }
    }
    return newValue;
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'input';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public focusedChanged(focused: boolean) {
    this.element.dispatchEvent(DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
  }

  public typeChanged(newValue: any) {
    if (newValue !== 'text' && newValue !== 'password' && newValue !== 'number') {
      this.type = 'text';
    }
  }

  public rawValueChanged(newValue: string) {
    if (this.ignoreRawChanges) {
      return;
    }
    this.setValue(newValue);
  }
}

export interface UxInputElement extends HTMLElement {
  value: any;
}

function stopEvent(e: Event) {
  e.stopPropagation();
}
