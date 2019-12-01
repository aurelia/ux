import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxInputTheme } from './ux-input-theme';

export interface UxInputElement extends HTMLElement {
  value: any;
}

@inject(Element, StyleEngine)
@customElement('ux-input')
export class UxInput implements UxComponent {
  private ignoreRawChanges: boolean;

  @bindable public autofocus = null;
  @bindable public autocomplete: string;
  @bindable public disabled: any = false;
  @bindable public maxlength: number;
  @bindable public minlength: number;
  @bindable public min: number;
  @bindable public max: number;
  @bindable public readonly: any = false;
  @bindable public theme: UxInputTheme;
  @bindable public label: any;
  @bindable public type: any;

  @observable
  public rawValue: string = '';

  @observable
  public focused: boolean = false;

  public value: any;
  public textbox: HTMLInputElement;

  constructor(private element: UxInputElement, public styleEngine: StyleEngine) {
    Object.setPrototypeOf(element, uxInputElementProto);
  }

  public bind() {
    const element = this.element;
    const textbox = this.textbox;

    const textboxValue = this.textbox.getAttribute('value');
    if (textboxValue != null) {
      this.rawValue = textboxValue;
    }

    if (this.autofocus || this.autofocus === '') {
      this.focused = true;
    }

    if (element.hasAttribute('id')) {
      const attributeValue = element.getAttribute('id');

      if (attributeValue) {
        element.removeAttribute('id');
        textbox.setAttribute('id', attributeValue);
      }
    }

    if (element.hasAttribute('placeholder')) {
      const attributeValue = element.getAttribute('placeholder');

      if (attributeValue) {
        this.label = attributeValue;
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

    this.autocompleteChanged(this.autocomplete);
    this.themeChanged(this.theme);
  }

  public attached() {
    this.textbox.addEventListener('change', stopEvent);
    this.textbox.addEventListener('input', stopEvent);
  }

  public detached() {
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

  public autocompleteChanged(newValue: any) {
    if (newValue == null) {
      this.textbox.setAttribute('autocomplete', newValue);
    } else {
      this.textbox.removeAttribute('autocomplete');
    }
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'input';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public focusedChanged(focused: boolean) {
    if (focused === true) {
      this.element.classList.add('ux-input--focused');
    } else {
      this.element.classList.remove('ux-input--focused');
    }

    this.element.dispatchEvent(DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
  }

  public typeChanged(newValue: any) {
    if (newValue !== 'text' && newValue !== 'password' && newValue !== 'number') {
      this.type = 'text';
    }
  }

  public rawValueChanged(newValue: string) {
    if (newValue.length > 0) {
      this.element.classList.add('ux-input--has-value');
    } else {
      this.element.classList.remove('ux-input--has-value');
    }

    if (this.ignoreRawChanges) {
      return;
    }
    this.setValue(newValue);
  }

  public focusInput() {
    this.textbox.focus();
  }
}

function stopEvent(e: Event) {
  e.stopPropagation();
}

const getVm = <T>(_: any) => _.au.controller.viewModel as T;
const uxInputElementProto = Object.create(HTMLElement.prototype, {
  value: {
    get() {
      return getVm<UxInput>(this).getValue();
    },
    set(value: any) {
      getVm<UxInput>(this).setValue(value);
    }
  }
});
