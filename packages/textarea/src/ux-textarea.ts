import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxInputComponent, normalizeBooleanAttribute, getBackgroundColorThroughParents } from '@aurelia-ux/core';
import { UxTextAreaTheme } from './ux-textarea-theme';
import { observable, computedFrom } from 'aurelia-framework';
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component.css';
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component--outline.css';

export interface UxTextAreaElement extends HTMLElement {
  value: string;
}

@inject(Element, StyleEngine)
@customElement('ux-textarea')
export class UxTextArea implements UxInputComponent {
  private ignoreRawChanges: boolean;
  private isAttached: boolean;

  @bindable public autocomplete: string;
  @bindable public autofocus: boolean | string | null = null;
  @bindable public autoResize: boolean | string = false;
  @bindable public cols: number;
  @bindable public disabled: boolean | string = false;
  @bindable public focus: boolean | string = false;
  @bindable public maxlength: number;
  @bindable public minlength: number;
  @bindable public readonly: boolean | string = false;
  @bindable public rows: number;
  @bindable public label: string;
  @bindable public placeholder: string;
  @bindable public theme: UxTextAreaTheme;
  @bindable public variant: 'filled' | 'outline' = 'filled';
  @bindable public dense: any = false;

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
      this.focus = true;
    }

    this.dense = normalizeBooleanAttribute('dense', this.dense);

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

    this.themeChanged(this.theme);
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

    this.variantChanged(this.variant);
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

  public rawValueChanged(newValue: string) {
    this.element.classList.toggle('ux-input-component--has-value', typeof newValue === 'string' && newValue.length > 0);

    if (this.ignoreRawChanges) {
      return;
    }
    this.setValue(newValue);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'textarea';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public fitTextContent() {
    if (this.isAttached && (this.autoResize || this.autoResize === '')) {
      this.textbox.style.height = 'auto';
      this.textbox.style.height = `${this.textbox.scrollHeight + 2}px`;
    }
  }

  public focusChanged(focus: boolean | string) {
    focus = focus || focus === '' ? true : false;
    this.element.classList.toggle('ux-input-component--focused', focus);
    this.element.dispatchEvent(DOM.createCustomEvent(focus ? 'focus' : 'blur', { bubbles: true }));
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
const uxTextAreaElementProto = Object.create(HTMLElement.prototype, {
  value: {
    get() {
      return getVm<UxTextArea>(this).getValue();
    },
    set(value: any) {
      getVm<UxTextArea>(this).setValue(value);
    }
  }
});
