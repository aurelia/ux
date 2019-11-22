import { customElement, bindable, inlineView } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxTextAreaTheme } from './ux-textarea-theme';
import { observable } from 'aurelia-framework';
import * as VIEW from './ux-textarea.html';

export interface UxTextAreaElement extends HTMLElement {
  value: string;
}

@inject(Element, StyleEngine)
@customElement('ux-textarea')
@inlineView(VIEW)
export class UxTextArea implements UxComponent {
  private ignoreRawChanges: boolean;
  private isAttached: boolean;

  @bindable public autocomplete: string;
  @bindable public autofocus: boolean | string | null = null;
  @bindable public autoResize: boolean | string = false;
  @bindable public cols: number;
  @bindable public disabled: boolean | string = false;
  @bindable public maxlength: number;
  @bindable public minlength: number;
  @bindable public readonly: boolean | string = false;
  @bindable public rows: number;
  @bindable public theme: UxTextAreaTheme;

  @observable public focused: boolean = false;

  @observable({ initializer: () => '' })
  public rawValue: string;

  public value: any = undefined;

  public textbox: HTMLTextAreaElement;

  constructor(private element: UxTextAreaElement, private styleEngine: StyleEngine) {
    Object.setPrototypeOf(element, uxTextAreaElementProto);
  }

  public bind() {

    const element = this.element;
    const textbox = this.textbox;

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

    if (this.cols) {
      textbox.setAttribute('cols', this.cols.toString());
      element.removeAttribute('cols');
    }

    if (this.rows) {
      textbox.setAttribute('rows', this.rows.toString());
      element.removeAttribute('rows');
    }

    if (this.minlength) {
      textbox.setAttribute('minlength', this.minlength.toString());
    }

    if (this.maxlength) {
      textbox.setAttribute('maxlength', this.maxlength.toString());
    }

    this.autocompleteChanged(this.autocomplete);
  }

  public attached() {
    const textbox = this.textbox;
    this.isAttached = true;
    this.textbox.addEventListener('change', stopEvent);
    this.textbox.addEventListener('input', stopEvent);
    this.fitTextContent();

    textbox.addEventListener('change', stopEvent);
    textbox.addEventListener('input', stopEvent);
  }

  public detached() {
    const textbox = this.textbox;
    this.isAttached = false;

    textbox.removeEventListener('change', stopEvent);
    textbox.removeEventListener('input', stopEvent);
  }

  public getValue() {
    return this.value;
  }

  public setValue(value: any) {
    const oldValue = this.value;
    const newValue = value === null || value === undefined ? null : value.toString();

    if (oldValue !== newValue) {
      this.value = newValue;
      this.ignoreRawChanges = true;
      this.rawValue = newValue === null ? '' : newValue.toString();
      this.fitTextContent();
      this.ignoreRawChanges = false;
      this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
    }
  }

  public autocompleteChanged(newValue: any) {
    if (newValue != null) {
      this.textbox.setAttribute('autocomplete', newValue);
    } else {
      this.textbox.removeAttribute('autocomplete');
    }
  }

  public rawValueChanged(rawValue: string) {
    this.element.classList.toggle('ux-textarea--has-value', rawValue.length > 0);
    if (this.ignoreRawChanges) {
      return;
    }
    this.setValue(rawValue);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'textarea';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public focusedChanged(focused: boolean) {
    this.element.classList.toggle('ux-textarea--focused');

    this.element.dispatchEvent(DOM.createCustomEvent(focused ? 'focus' : 'blur', {bubbles: false}));
  }

  public fitTextContent() {
    if (this.isAttached && (this.autoResize || this.autoResize === '')) {
      this.textbox.style.height = 'auto';
      this.textbox.style.height = `${this.textbox.scrollHeight + 2}px`;
    }
  }

  public focus() {
    this.textbox.focus();
  }

  public blur() {
    if (document.activeElement === this.textbox) {
      this.textbox.blur();
    }
  }
}

function stopEvent(e: Event) {
  e.stopPropagation();
}

const getVm = <T>(_: any) => _.au.controller.viewModel as T;
const uxTextAreaElementProto = Object.assign(
  Object.create(HTMLElement.prototype, {
  value: {
    get() {
      return getVm<UxTextArea>(this).getValue();
    },
    set(value: any) {
      getVm<UxTextArea>(this).setValue(value);
    }
  },
  }), {
    focus() {
      getVm<UxTextArea>(this).focused = true;
    },
    blur() {
      getVm<UxTextArea>(this).focused = false;
    }
  }
);
