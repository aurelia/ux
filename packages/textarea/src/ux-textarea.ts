import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { UxTextareaTheme } from './ux-textarea-theme';

const theme = new UxTextareaTheme();

@inject(Element, StyleEngine)
@customElement('ux-textarea')

export class UxTextarea implements UxComponent {
  @bindable public autofocus = null;
  @bindable public autoResize = null;
  @bindable public cols: number;
  @bindable public disabled: boolean | string = false;
  @bindable public maxlength: number;
  @bindable public minlength: number;
  @bindable public readonly: boolean | string = false;
  @bindable public rows: number;
  @bindable public theme: UxTextareaTheme;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: any = undefined;

  public textbox: HTMLTextAreaElement;

  constructor(private element: HTMLElement, private styleEngine: StyleEngine) {
    styleEngine.ensureDefaultTheme(theme);
  }

  public bind() {

    if (this.theme != null) {
      this.themeChanged(this.theme);
    }

    if (this.autofocus || this.autofocus === '') {
      setTimeout(() => {
        this.textbox.focus();
      }, 0);
    }

    if (this.element.hasAttribute('placeholder')) {
      const attributeValue = this.element.getAttribute('placeholder');

      if (attributeValue) {
        this.textbox.setAttribute('placeholder', attributeValue);
        this.element.removeAttribute('placeholder');
      }
    }

    if (this.element.hasAttribute('required')) {
      this.textbox.setAttribute('required', '');
      this.element.removeAttribute('required');
    }

    if (this.cols) {
      this.textbox.setAttribute('cols', this.cols.toString());
      this.element.removeAttribute('cols');
    }

    if (this.rows) {
      this.textbox.setAttribute('rows', this.rows.toString());
      this.element.removeAttribute('rows');
    }

    if (this.minlength) {
      this.textbox.setAttribute('minlength', this.minlength.toString());
    }

    if (this.maxlength) {
      this.textbox.setAttribute('maxlength', this.maxlength.toString());
    }

    if (normalizeBooleanAttribute('disabled', this.disabled)) {
      this.textbox.setAttribute('disabled', '');
    }

    if (normalizeBooleanAttribute('readonly', this.readonly)) {
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

  public disabledChanged(newValue: boolean | string) {
    if (normalizeBooleanAttribute('disabled', newValue)) {
      this.textbox.setAttribute('disabled', '');
    } else {
      this.textbox.removeAttribute('disabled');
    }
  }

  public readonlyChanged(newValue: boolean | string) {
    if (normalizeBooleanAttribute('readonly', newValue)) {
      this.textbox.setAttribute('readonly', '');
    } else {
      this.textbox.removeAttribute('readonly');
    }
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'textarea';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public valueChanged() {
    if (this.autoResize !== null) {
      this.textbox.style.height = 'auto';
      this.textbox.style.height = `${this.textbox.scrollHeight + 2}px`;
    }
  }
}
