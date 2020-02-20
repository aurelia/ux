import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { observable, computedFrom } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxInputComponent, normalizeBooleanAttribute, getBackgroundColorThroughParents } from '@aurelia-ux/core';
import { UxInputTheme } from './ux-input-theme';
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component.css';
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component--outline.css';

export interface UxInputElement extends HTMLElement {
  value: any;
}

@inject(Element, StyleEngine)
@customElement('ux-input')
export class UxInput implements UxInputComponent {
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
  @bindable public label: string;
  @bindable public placeholder: string;
  @bindable public type: any;
  @bindable public variant: 'filled' | 'outline' = 'filled';
  @bindable public dense: any = false;

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

    this.dense = normalizeBooleanAttribute('dense', this.dense);

    if (element.hasAttribute('id')) {
      const attributeValue = element.getAttribute('id');

      if (attributeValue) {
        element.removeAttribute('id');
        textbox.setAttribute('id', attributeValue);
      }
    }

    if (element.hasAttribute('step')) {
      const attributeValue = element.getAttribute('step');

      if (attributeValue) {
        textbox.setAttribute('step', attributeValue);
        element.removeAttribute('step');
      }
    }

    this.typeChanged(this.type);

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
    this.variantChanged(this.variant);
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
      this.textbox.removeAttribute('autocomplete');
    } else {
      this.textbox.setAttribute('autocomplete', newValue);
    }
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'input';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public focusedChanged(focused: boolean) {
    this.element.classList.toggle('ux-input-component--focused', focused);

    this.element.dispatchEvent(DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
  }

  public typeChanged(newValue: any) {
    if (![
      'text',
      'password',
      'number',
      'email',
      'url',
      'tel',
      'search'
    ].includes(newValue)) {
      this.type = 'text';
      return;
    }
    this.textbox.setAttribute('type', this.type);
  }

  public rawValueChanged(newValue: string) {
    this.element.classList.toggle('ux-input-component--has-value', newValue.length > 0);

    if (this.ignoreRawChanges) {
      return;
    }
    this.setValue(newValue);
  }

  public focusInput() {
    this.textbox.focus();
  }

  public variantChanged(newValue: string) {
    this.element.style.backgroundColor = newValue === 'outline' ?
      this.element.style.backgroundColor = getBackgroundColorThroughParents(this.element) : 
      '';
  }

  @computedFrom('label')
  get placeholderMode(): boolean {
    return typeof this.label !== 'string' || this.label.length === 0;
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
